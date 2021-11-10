import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { getLotteryId } from 'utils/lotteryUtils'
import useI18n from 'hooks/useI18n'
import { useLottery } from 'hooks/useContract'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import Divider from './components/Divider'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'
import HowItWorks from './components/HowItWorks'
import YourPrizesCard from './components/YourPrizesCard'
import UnlockWalletCard from './components/UnlockWalletCard'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`

const Content = styled.div`
  width: 70%;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 90%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 80%;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 70%;
  }
`

const Prize = styled.div`
  width: 25%;
  margin-top: 0px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    margin-top: 24px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 90%;
    margin-top: 24px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 80%;
    margin-top: 24px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 25%;
    margin-top: 0px;
  }
`

export const Title = styled(Text)`
  font: normal normal 1000 28px/30px Swis721 BT;
  display: flex;
  margin-bottom: 32px;
`

const Lottery: React.FC = () => {
  const lotteryContract = useLottery()
  const { account } = useWallet()
  const TranslateString = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentLotteryNumber, setCurrentLotteryNumber] = useState(0)
  const [mostRecentLotteryNumber, setMostRecentLotteryNumber] = useState(1)
  const [historyError, setHistoryError] = useState(false)
  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    const getInitialLotteryIndex = async () => {
      const index = await getLotteryId(lotteryContract)
      const previousLotteryNumber = index - 1

      setCurrentLotteryNumber(index)
      setMostRecentLotteryNumber(previousLotteryNumber)
    }

    if (account && lotteryContract) {
      getInitialLotteryIndex()
    }
  }, [account, lotteryContract])

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <>
      <Page style={{ marginTop: '0px', backgroundColor: 'white', borderRadius: '24px' }}>
        <Title>{TranslateString(290, 'Lottery')}</Title>
        <Wrapper>
          <Content>
            <PastLotteryDataContext.Provider
              value={{ historyError, historyData, mostRecentLotteryNumber, currentLotteryNumber }} 
            >
              <NextDrawPage />
              <PastDrawsPage />
            </PastLotteryDataContext.Provider>
          </Content>
          <Prize>
            <YourPrizesCard />
            <UnlockWalletCard />
          </Prize>
        </Wrapper>
        <HowItWorks />
      </Page>
    </>
  )
}

export default Lottery
