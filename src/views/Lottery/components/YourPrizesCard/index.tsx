import React from 'react'
import styled from 'styled-components'
import { Card, CardBody } from '@pancakeswap-libs/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim } from 'hooks/useTickets'
import PrizesWonContent from './PrizesWonContent'
import NoPrizesContent from './NoPrizesContent'

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url(/images/lottery/prize.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 32px;
  height: 260px;

  ${(props) =>
    props.isDisabled ? 
    `  
      margin-bottom: 16px;
      background-color: unset;
      box-shadow: unset;

      ${props.theme.mediaQueries.sm} {
        margin-bottom: 24px;
      }

      ${props.theme.mediaQueries.lg} {
        margin-bottom: 32px;
      }
      `
    : 
    ``
  }
`

const YourPrizesCard: React.FC = () => {
  const { claimAmount } = useTotalClaim()

  const winnings = getBalanceNumber(claimAmount)
  const isAWin = winnings > 0

  return (
    <StyledCard isDisabled={!isAWin} isActive={isAWin}>
      {isAWin ? <PrizesWonContent /> : <NoPrizesContent />}
    </StyledCard>
  )
}

export default YourPrizesCard
