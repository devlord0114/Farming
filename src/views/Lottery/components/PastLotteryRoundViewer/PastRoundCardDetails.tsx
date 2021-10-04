import React from 'react'
import styled from 'styled-components'
import { Heading, CardBody, CardFooter, PancakeRoundIcon, TicketRound } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { DataResponse } from 'utils/getLotteryRoundData'
import LotteryCardHeading from '../LotteryCardHeading'
import PastLotteryActions from './PastLotteryActions'
import PrizeGrid from '../PrizeGrid'
import Timestamp from '../Timestamp'

interface PastRoundCardDetailsProps {
  lotteryNumber: number
  winNumbers: number[]
  totalPrize: number
  matchCounts: number[]
}

const HeadingArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`

const TopLotteryCardHeading = styled(LotteryCardHeading)`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  width: 100%;
`

const PastRoundCardDetails: React.FC<PastRoundCardDetailsProps> = ({ lotteryNumber, winNumbers, totalPrize, matchCounts }) => {
  const TranslateString = useI18n()

  return (
    <>
      <HeadingArea>
        <Heading size="md" mb="24px">
          Round #{lotteryNumber}
        </Heading>
        <TopLotteryCardHeading
          valueToDisplay={`${winNumbers[0]},${winNumbers[1]},${winNumbers[2]},${winNumbers[3]},${winNumbers[4]},${winNumbers[5]}`}
          winning
        >
          {TranslateString(999, 'Winning numbers')}
        </TopLotteryCardHeading>
        <LotteryCardHeading
          valueToDisplay={TranslateString(999, `${totalPrize} 2LC`)}
        >
          {TranslateString(999, 'Total prizes')}
        </LotteryCardHeading>
      </HeadingArea>
    </>
  )
}

export default PastRoundCardDetails
