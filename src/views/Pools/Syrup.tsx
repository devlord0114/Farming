import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { ChainId, WETH, Token, Fetcher } from '@pancakeswap-libs/sdk'
import { getDefaultProvider } from '@ethersproject/providers'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import multicall from 'utils/multicall'
import { getBalanceNumber } from 'utils/formatBalance'
import erc20 from 'config/abi/erc20.json'
import { useFarms, usePriceBnbBusd, usePools, usePriceCakeBusd } from 'state/hooks'
import { isArray } from 'lodash'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'


const SEED = new Token(ChainId.MAINNET, '0x6f3d2AEE1f0c89603944fA9D1362552C81F92d56', 18) // always stake SEED
const BNB = new Token(ChainId.MAINNET, '0xBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C', 18)

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()

  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()

  const cakebusd = usePriceCakeBusd() // EBITEMPURAPriceInBusd

  let bbprice = new BigNumber(1);

  const block = useBlock()

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }


  const priceList = {};


  const TokenPriceBNB = (token: string,tokenDecimals : number,isLpReward:boolean ): BigNumber => {
    const [price, setPrice] = React.useState(new BigNumber(0))

    React.useEffect(() => {
      async function fetchdata(_token,_isLp,_tokenDecimals) {
      if(_token && token!=="")
      {
        const mytoken = `0x${_token.substring(2).toUpperCase()}`;

        if(mytoken!=="0xBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C")
        {
          if(_isLp===true)
          {
            const calls = [

              // Balance of quote token on LP contract
              {
                address:  SEED.address,
                name: 'balanceOf',
                params: [mytoken],
              },

              // Total supply of LP tokens
              {
                address: mytoken,
                name: 'totalSupply',
              },
              // Token decimals
              {
                address:SEED.address,
                name: 'decimals',
              },

            ];

            const [
              quoteTokenBlanceLP,
              lpTotalSupply,
              qtokenDecimals,
            ] = await multicall(erc20, calls);
            const tokenAmount = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(qtokenDecimals));

            const LpAmount =  new BigNumber(lpTotalSupply).div(new BigNumber(10).pow(18));

            const LpPrice = tokenAmount.multipliedBy(cakebusd).multipliedBy(new BigNumber(2)).div(LpAmount);

            setPrice(LpPrice);
          }else{

            const TOKEN = new Token(ChainId.MAINNET, mytoken, _tokenDecimals);
            Fetcher.fetchPairData(
              TOKEN,
              BNB,
              getDefaultProvider('https://bsc-dataseed.binance.org/'),
            ).then((pairData) =>     setPrice(new BigNumber(parseFloat(pairData.reserve1.toSignificant(4))/parseFloat(pairData.reserve0.toSignificant(4))))  )


          }
        }else if(mytoken==="0xBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C")
        {
          setPrice(new BigNumber(1));
        }

      }
    }

    fetchdata(token,isLpReward,tokenDecimals);
    }, [token,isLpReward,tokenDecimals])

    priceList[token] = price;
    return price
  }


  const StakeTokenPriceBNB = (token: string,tokenDecimals : number,isLpReward:boolean ): BigNumber => {
    const [price, setPrice] = React.useState(new BigNumber(0))

    React.useEffect(() => {
      async function fetchdata(_token,_isLp,_tokenDecimals) {
      if(_token!=="")
      {

        const mytoken = `0x${_token.substring(2).toUpperCase()}`;

        if(mytoken!=="0xBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C")
        {
          if(_isLp===true)
          {
            const calls = [

              // Balance of quote token on LP contract
              {
                address:  SEED.address,
                name: 'balanceOf',
                params: [mytoken],
              },

              // Total supply of LP tokens
              {
                address: mytoken,
                name: 'totalSupply',
              },
              // Token decimals
              {
                address:SEED.address,
                name: 'decimals',
              },

            ];

            const [
              quoteTokenBlanceLP,
              lpTotalSupply,
              qtokenDecimals,
            ] = await multicall(erc20, calls);
            const tokenAmount = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(qtokenDecimals));

            const LpAmount =  new BigNumber(lpTotalSupply).div(new BigNumber(10).pow(18));

            const LpPrice = tokenAmount.multipliedBy(cakebusd).multipliedBy(new BigNumber(2)).div(LpAmount);

            setPrice(LpPrice);
          }else{

            const TOKEN = new Token(ChainId.MAINNET, mytoken, _tokenDecimals);
            Fetcher.fetchPairData(
              TOKEN,
              BNB,
              getDefaultProvider('https://bsc-dataseed.binance.org/'),
            ).then((pairData) =>     setPrice(new BigNumber(parseFloat(pairData.reserve1.toSignificant(4))/parseFloat(pairData.reserve0.toSignificant(4))))  )


          }
        }else if(mytoken==="0xBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C")
        {
          setPrice(new BigNumber(1));
        }

      }
    }

    fetchdata(token,isLpReward,tokenDecimals);
    }, [token,isLpReward,tokenDecimals])

    priceList[token] = price;
    return price
  }


  let stakepriceBUSD = new BigNumber(1);
  const poolsWithApy = pools.map((pool) => {
    bbprice = new BigNumber(0);
    let  stakePrice = new BigNumber(0);
    const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    const TokenRewardAddress = pool.userData;

    let address = "";

    if(TokenRewardAddress )
    {
      address = TokenRewardAddress.rewardAddress;

      if(isArray(address))
      {
        address = address[0];
      }
    }

    // bnb
    if(pool.tokenName==="BNB" || pool.tokenName==="WBNB")
    {
      address = BNB.address;
    }

    const price =TokenPriceBNB(address,pool.tokenDecimals,pool.isLPReward);
   stakePrice =StakeTokenPriceBNB(pool.stakingTokenAddress,18,pool.isLPStake);



    if(pool.isLPStake)
    {
      stakepriceBUSD=stakePrice ;
    }else{

      stakepriceBUSD= bnbPriceUSD.multipliedBy(stakePrice) ;
    }
    if(pool.userData)
    {

      if(pool.isLPReward)
      {
        bbprice=price;
      }else{
        bbprice = bnbPriceUSD.multipliedBy(price) ;
      }

      if(bbprice===new BigNumber(0))
      {
        const rewardTokenPriceInBNB = priceToBnb(
          pool.tokenName,
          rewardTokenFarm?.tokenPriceVsQuote,
          rewardTokenFarm?.quoteTokenSymbol,
        )
        bbprice =bnbPriceUSD.multipliedBy(rewardTokenPriceInBNB);

      }
    }
    // /!\ Assume that the farm quote price is BNB
    const stakingTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote)

    const totalRewardPricePerYear = stakingTokenPriceInBNB.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = cakebusd.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,bbprice,stakepriceBUSD
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  return (
    <Page>
      <Heading as="h1" size="xl" mb="16px" color="primary" style={{ textAlign: 'center' }}>
        {TranslateString(282, 'Launch Pool')}
      </Heading>
      <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(580, 'Stake SEED to earn new tokens.')}
      </Heading>
      {/* <img src="/images/syrup.png" alt="Launch POOL icon" width={200} height={111} /> */}
      <PoolTabButtons />
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
            <Coming />
          </>
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Farm
