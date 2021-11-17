import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Ticket, TicketRound } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import DisconnectButton from 'components/DisconnectButton'

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

const StyledUnlockButton = styled(UnlockButton)`
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

const StyledConnectedButton = styled.div`
  background: green;
  border-radius: 12px;
  font: normal normal bold 16px/26px Swis721 BT;
  padding: 10px 30px;
  color: white;
  border: 1px solid green;
`


const UnlockWalletCard = () => {
  const TranslateString = useI18n()
  const { account, connect, reset } = useWallet()

  return (
    <StyledCardBody>
      <StyledHeading>{TranslateString(999, 'Connect  your walet to check if you have won!')}</StyledHeading>
      { !account ? <StyledUnlockButton /> :  <StyledConnectedButton>Connected</StyledConnectedButton> }
    </StyledCardBody>
  )
}

export default UnlockWalletCard
