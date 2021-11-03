import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Heading, CardBody, CardFooter, Flex, NextIcon, PancakeRoundIcon, PrevIcon, TicketRound } from '@pancakeswap-libs/uikit'
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

const RoundSelectButton = styled.button`
  background: transparent;
  box-shadow: none;
  border: none;
`

const PastRoundCardDetails: React.FC<PastRoundCardDetailsProps> = ({ lotteryNumber, winNumbers, totalPrize, matchCounts }) => {
  const TranslateString = useI18n()
  const [lotteryId, setLotteryId] = useState(lotteryNumber)

  const NextRound = () => {
    setLotteryId(lotteryId + 1)
  }

  const PrevRound = () => {
    setLotteryId(lotteryId - 1)
  }

  useEffect(() => {
    console.log("pooh, lotteryId = ", lotteryId)
  }, [lotteryId])

  return (
    <>
      <HeadingArea>
        <Flex justifyContent="space-between" mb="24px">
          <Heading size="md">
            Round #{lotteryId}
          </Heading>
          <Flex>
            <RoundSelectButton onClick={PrevRound} >
              <PrevIcon width="18px" />
            </RoundSelectButton>
            <RoundSelectButton onClick={NextRound} >
              <NextIcon width="18px" />
            </RoundSelectButton>
          </Flex>
        </Flex>
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
