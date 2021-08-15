import React, { useEffect, useCallback, useState } from 'react'
import { Route, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Button, Image, Heading, Text } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, useFarmFromPid } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

const Footer = styled.div`
  background-image: url(/images/footerbg.svg);
  background-position: center bottom;
  background-repeat: no-repeat;
  padding-bottom: 32%;
  background-size: cover;
`

const TopBar = styled.div`
  display: flex;
`

const FarmingButton = styled.a`
  margin-left: 20px;
  background-color: #4ba0e7;
  color: #ffffff;
  padding: 5px 25px;
  font: normal normal 500 24px/24px Swis721 BT;
  font-size: 25px;
`

export const Description = styled(Text)`
  font: normal normal 1000 28px/30px Swis721 BT;
  display: flex;
`

export interface FarmsProps {
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const history = useHistory();
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { tokenMode } = farmsProps

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.localPerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear)

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [bnbPrice, account, cakePrice, ethereum],
  )

  return (
    <div>
      <Page>
        <TopBar>
          <Description>{TranslateString(10006, 'Yield Farming')}</Description>
          <FarmingButton href="https://exchange.2local.io/#/pool">Get 2LC-LP tokens</FarmingButton>
        </TopBar>
        {/* <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
          {TranslateString(10000, 'Part of deposit fees will be used to plant real trees around the world')}
        </Heading> */}
        {/* <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/> */}
        {/* <div> */}
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          {/* <Route exact path={`${path}/oct`}>
              {stakedOnly ? farmsList(stakedOnlyClawFarms, false) : farmsList(clawFarms, false)}
            </Route>
            <Route exact path={`${path}/partner`}>
              {stakedOnly ? farmsList(stakedOnlyPartnerFarms, false) : farmsList(partnerFarms, false)}
            </Route> */}
          {/* <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route> */}
        </FlexLayout>
        {/* </div>
        <Image src="/images/egg/8.png" alt="illustration" width={1352} height={587} responsive /> */}
      </Page>
      {/* <Footer /> */}
    </div>
  )
}

export default Farms
