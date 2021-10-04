import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useLotteryAllowance } from 'hooks/useAllowance'
import { useLotteryApprove } from 'hooks/useApprove'
import useTickets from 'hooks/useTickets'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import BuyTicketModal from './BuyTicketModal'
import MyTicketsModal from './UserTicketsModal'
import PurchaseWarningModal from './PurchaseWarningModal'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-between;
  }
`

const StyledButton = styled(Button)`
  background: transparent;
  border-radius: 12px;
  font: normal normal bold 16px/6px Swis721 BT;
  height: 46px;
  margin-right: 20px;
  color: #DF642B;
  border: 1px solid #DF642B;

  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    background: #DF642B;
    color: #FFFFFF;
  }
`

const TicketCard: React.FC = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const TranslateString = useI18n()
  const allowance = useLotteryAllowance()
  const { onApprove } = useLotteryApprove()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const cakeBalance = useTokenBalance(getCakeAddress())

  const tickets = useTickets()
  const ticketsLength = tickets.length
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  const [onPresentBuy] = useModal(<BuyTicketModal max={cakeBalance} tokenName="2LC" />)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
      onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, onPresentApprove])

  const renderLotteryTicketButtons = () => {
    if (!allowance.toNumber()) {
      return (
        <>
          <StyledButton fullWidth disabled={requestedApproval} onClick={handleApprove}>
            {TranslateString(999, 'Approve 2LC')}
          </StyledButton>
        </>
      )
    }
    return (
      <>
        <StyledButton id="lottery-buy-start" fullWidth onClick={onPresentBuy}>
          {TranslateString(999, 'Buy Tickets')}
        </StyledButton>
      </>
    )
  }

  return (
    <CardActions>
      {lotteryHasDrawn ? (
        <StyledButton disabled> {TranslateString(999, 'On sale soon')}</StyledButton>
      ) : (
        renderLotteryTicketButtons()
      )}
    </CardActions>
  )
}

export default TicketCard
