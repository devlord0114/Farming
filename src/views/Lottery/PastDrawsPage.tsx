import BigNumber from 'bignumber.js'
import React, {useState} from 'react'
import styled from 'styled-components'
import { BaseLayout, ButtonMenu, ButtonMenuItem, Flex, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useTotalPrizeWithLotteryId } from 'hooks/useTickets'
import PastLotteryRoundViewer from './components/PastLotteryRoundViewer'
import PastDrawsHistoryCard from './components/PastDrawsHistory/PastDrawsHistoryCard'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(/images/lottery/finish.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 32px;
  padding: 20px 100px;
`

const Cards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;
`

const SecondCardColumnWrapper = styled.div<{ isAWin?: boolean }>`
  display: flex;
  flex-direction: column;
`

const BunnyImageWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: center;
`

const RowBetween = styled(Flex)`
  justify-content: space-between;
`

const Title = styled(Text)`
  font: normal normal normal 16px/30px Swis721 BT;
`

const StyledMenuItem = styled(ButtonMenuItem)`
  background: ${({ isActive }) => (isActive ? '#DF642B' : "transparent" )};
  border-radius: 12px;
  font: normal normal bold 16px/6px Swis721 BT;
  height: 36px;
  color: ${({ isActive }) => (isActive ? '#FFFFFF' : "#DF642B" )};
  border: ${({ isActive }) => (isActive ? '1px solid #DF642B' : "none" )};

  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    background: ${({ isActive }) => (isActive ? '#DF642B' : "transparent" )};
    color: ${({ isActive }) => (isActive ? '#FFFFFF' : "#DF642B" )};
  }
`

const PastDrawsPage: React.FC = () => {
  const TranslateString = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <Wrapper>
      <RowBetween>
        <Title>Finished Rounds</Title>
        <ButtonMenu activeIndex={activeIndex} onClick={handleClick} size="sm" variant="subtle">
          <StyledMenuItem>{TranslateString(999, 'All History')}</StyledMenuItem>
          <StyledMenuItem>{TranslateString(999, 'Your History')}</StyledMenuItem>
        </ButtonMenu>
      </RowBetween>
      <PastLotteryRoundViewer />
    </Wrapper>
  )
}

export default PastDrawsPage
