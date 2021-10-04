import React from 'react'
import { Card } from '@pancakeswap-libs/uikit'
import { DataResponse } from 'utils/getLotteryRoundData'
import PastRoundCardError from './PastRoundCardError'
import PastRoundCardDetails from './PastRoundCardDetails'

interface PastRoundCardProps {
  error: {
    message: string
  }
  lotteryNumber: number
  winNumbers: number[]
  totalPrize: number
  matchCounts: number[]
}

const PastRoundCard: React.FC<PastRoundCardProps> = ({ error, lotteryNumber, winNumbers, totalPrize, matchCounts }) => {
  return <>{error.message ? <PastRoundCardError error={error} /> : <PastRoundCardDetails lotteryNumber={lotteryNumber} winNumbers={winNumbers} totalPrize={totalPrize} matchCounts={matchCounts} />}</>
}

export default PastRoundCard
