import React, { useMemo, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Flex } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import { Link } from 'react-router-dom'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { useApprove } from 'hooks/useApprove'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url(/images/egg/bgwallet2.png);
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 65%;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmButtons = styled.div`
  margin-left: 20px;
  margin-top: 8px;
  display: flex;
`
const MetamaskImage = styled.img`
  margin-left: 10px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const [requestedApproval, setRequestedApproval] = useState(false)
    const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, '0x6f3d2AEE1f0c89603944fA9D1362552C81F92d56');
  }, [ethereum])

  const { onApprove } = useApprove(lpContract)
  
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <Flex>
          <CardImage src="/images/egg/2.png" alt="cake logo" width={64} height={64} />
          <FarmButtons>
          <Button style={{marginRight:'15px'}}>
            <a href='https://exchange.ebitempuraswap.com/#/swap?outputCurrency=0x37781b87619722e1765dd4864894931bebD1BB3C'>
              {TranslateString(999, 'Buy 2LC')}
            </a>
          </Button>
          <Button disabled={requestedApproval} onClick={handleApprove}>
            {TranslateString(999, '+')}
            <MetamaskImage src="/images/metamask.png" alt="cake logo" width={24} height={24} />
          </Button>
          </FarmButtons>
        </Flex>
        <Block>
          <Label>{TranslateString(544, '2LC to Harvest')}</Label>
          <CakeHarvestBalance earningsSum={earningsSum}/>
          <Label>~${(eggPrice * earningsSum).toFixed(2)}</Label>
          {/* <CakeHarvestBalance earningsSum={0}/> */}
          {/* <Label>~$0</Label> */}
        </Block>
        <Block>
          <Label>{TranslateString(546, '2LC in Wallet')}</Label>
          <CakeWalletBalance cakeBalance={cakeBalance} />
          <Label>~${(eggPrice * cakeBalance).toFixed(2)}</Label>
          {/* <CakeWalletBalance cakeBalance={0} />
          <Label>~$0</Label> */}
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting 2LC')
                : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
                {/* : TranslateString(999, `Harvest all 0`)} */}
                </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
