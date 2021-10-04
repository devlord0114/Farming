import React from 'react'
import styled from 'styled-components'
// import { Text, WinningProgress } from '@pancakeswap-libs/uikit'
import { Text} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useLottery } from 'hooks/useContract'
import { getLotteryId } from 'utils/lotteryUtils'
import { useCurrentTime } from 'hooks/useTimer'
import {
  getLotteryDrawTime,
  getLotteryDrawStep,
  getTicketSaleTime,
  getTicketSaleStep,
} from '../helpers/CountdownHelpers'

const ProgressWrapper = styled.div`
  display: block;
  width: 80%;
`

const TopTextWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const BottomTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledPrimaryText = styled(Text)`
  margin-right: 16px;
  font-family: ccbiffbamboom, sans-serif;
  font-style: italic;
  font-weight: 700;
  color: #000000;
`

const ProgressBarArea = styled.div`
  width: 50%;
  margin: auto;
  margin-top: -25px;
`

const LotteryProgress = () => {
  const lotteryContract = useLottery()
  const lotteryId = getLotteryId(lotteryContract)
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = getTicketSaleTime(currentMillis)
  const timeUntilLotteryDraw = getLotteryDrawTime(currentMillis, lotteryId)

  return (
    <ProgressWrapper>
      {/* <ProgressBarArea>
        <WinningProgress primaryStep={getLotteryDrawStep(currentMillis, lotteryId)} secondaryStep={getTicketSaleStep()} showProgressBunny />
      </ProgressBarArea> */}
      <TopTextWrapper>
        <StyledPrimaryText fontSize="20px" bold color="contrast">
          {lotteryHasDrawn ? timeUntilTicketSale : timeUntilLotteryDraw}
        </StyledPrimaryText>
        <StyledPrimaryText fontSize="20px" bold color="invertedContrast">
          {lotteryHasDrawn ? TranslateString(0, 'Until ticket sale') : TranslateString(0, 'Until lottery draw')}
        </StyledPrimaryText>
      </TopTextWrapper>
      {lotteryHasDrawn && (
        <BottomTextWrapper>
          <Text color="invertedContrast">
            {timeUntilLotteryDraw} {TranslateString(0, 'Until lottery draw')}
          </Text>
        </BottomTextWrapper>
      )}
    </ProgressWrapper>
  )
}

export default LotteryProgress
