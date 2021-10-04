import BigNumber from 'bignumber.js'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@pancakeswap-libs/uikit'
import getLotteryRoundData from 'utils/getLotteryRoundData'
import useI18n from 'hooks/useI18n'
import { useWinningNumbersWithLotteryId, useTotalPrizeWithLotteryId, useMatchCountsWithLotteryId } from 'hooks/useTickets'
import ExpandableSectionButton from 'components/ExpandableSectionButton/ExpandableSectionButton'
import PastRoundCard from './PastRoundCard'
import PastLotterySearcher from './PastLotterySearcher'
import Loading from '../Loading'
import useGetRecentLotteryRoundData from '../../hooks/useGetRecentLotteryRoundData'
import PrizeGrid from '../PrizeGrid'

const StyledCardBody = styled(CardBody)`
  width: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 24px;
`

const ExpandingWrapper = styled.div<{ showFooter: boolean }>`
  width: 80%;
  margin: 10px auto;
  display: ${(props) => (props.showFooter ? 'flex' : 'none')};
  height: ${(props) => (props.showFooter ? '100%' : '0px')};
`

const PastLotteryRoundViewer = () => {
  const [showFooter, setShowFooter] = useState(false)
  const [state, setState] = useState({
    roundData: null,
    error: { message: null, type: null },
    isInitialized: false,
    isLoading: false,
    lotteryId: 0,
  })
  const { data: initialLotteryData, mostRecentLotteryNumber } = useGetRecentLotteryRoundData()
  const TranslateString = useI18n()
  const { roundData, error, isInitialized, isLoading } = state

  useEffect(() => {
    if (initialLotteryData) {
      setState((prevState) => ({ ...prevState, isLoading: false, isInitialized: true, roundData: initialLotteryData }))
    }
  }, [initialLotteryData, setState])

  const handleSubmit = async (lotteryNumber: number) => {
    setState((prevState) => ({
      ...prevState,
      lotteryId: lotteryNumber,
    }))

  }

  const winNumbers = useWinningNumbersWithLotteryId(state.lotteryId)
  const totalPrize = useTotalPrizeWithLotteryId(state.lotteryId)
  const matchCounts = useMatchCountsWithLotteryId(state.lotteryId)
  

  return (
    <StyledCardBody>
      <PastRoundCard error={error} lotteryNumber={state.lotteryId} winNumbers={winNumbers} totalPrize={totalPrize.div(new BigNumber(10).pow(18)).toNumber()} matchCounts={matchCounts} />
      <ExpandableSectionButton onClick={() => setShowFooter(!showFooter)} expanded={showFooter} />
      <ExpandingWrapper showFooter={showFooter}>
        <PrizeGrid totalPrize={totalPrize.div(new BigNumber(10).pow(18)).toNumber()} />
      </ExpandingWrapper>
    </StyledCardBody>
  )
}

export default PastLotteryRoundViewer
