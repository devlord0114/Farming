import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading, Card, CardBody, CardFooter, Text, PancakeRoundIcon, Flex, Skeleton } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { useTotalRewards } from 'hooks/useTickets'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import ExpandableSectionButton from 'components/ExpandableSectionButton/ExpandableSectionButton'

const Wrapper = styled.div`
  width: 50%;
`

const CardHeading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const Left = styled.div`
  display: flex;
  padding: 24px;
`

const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`

const PrizeCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledText = styled(Text)`
  font: normal normal bold 14px/6px Swis721 BT;
  margin-bottom: 10px;
`

const StyledHeading = styled(Text)`
  font: normal normal bold 28px/30px Swis721 BT;
`

const TotalPrizesCard = () => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const lotteryPrizeAmount = +getBalanceNumber(useTotalRewards()).toFixed(0)
  const lotteryPrizeWithCommaSeparators = lotteryPrizeAmount.toLocaleString()
  const { currentLotteryNumber } = useContext(PastLotteryDataContext)

  return (
    <Wrapper>
      <Left>
        <PrizeCountWrapper>
          <StyledText fontSize="14px" color="textSubtle">
            {TranslateString(999, 'Total Pot:')}
          </StyledText>
          <StyledHeading>{lotteryPrizeWithCommaSeparators} 2LC</StyledHeading>
        </PrizeCountWrapper>
      </Left>
    </Wrapper>
  )
}

export default TotalPrizesCard
