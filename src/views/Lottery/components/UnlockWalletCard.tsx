import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Ticket, TicketRound } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'

const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url(/images/lottery/unlock.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 32px;
  height: 260px;

  padding: 24px;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
  text-align: center;
  font: normal normal bold 20px/30px Swis721 BT;
`

const StyledButton = styled(UnlockButton)`
  background: #DF642B;
  border-radius: 12px;
  font: normal normal bold 16px/6px Swis721 BT;
  height: 46px;
  margin-right: 20px;
  color: #FFFFFF;
  border: 1px solid #DF642B;

  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    background: #DF642B;
    color: #FFFFFF;
  }
`


const UnlockWalletCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledCardBody>
      <StyledHeading>{TranslateString(999, 'Connect  your walet to check if you have won!')}</StyledHeading>
      <StyledButton />
    </StyledCardBody>
  )
}

export default UnlockWalletCard
