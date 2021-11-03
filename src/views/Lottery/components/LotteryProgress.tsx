import React from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'
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
`

const TopTextWrapper = styled.div`
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
  margin-left: 16px;
  font: normal normal bold 16px/30px Swis721 BT;
  letter-spacing: 0.4px;
  color: #1D2943;
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
