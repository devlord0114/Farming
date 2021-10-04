import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Button, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useTickets from 'hooks/useTickets'
import MyTicketsModal from '../TicketCard/UserTicketsModal'

const Wrapper = styled.div`
  
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StyledText = styled(Heading)`
  padding-left: 12px;
  font: normal normal bold 20px/30px Swis721 BT;
  margin-bottom: 10px;
`

const StyledTitle = styled(Heading)`
  text-align: center;
  font: normal normal normal 18px/32px Swis721 BT;
`

const Image = styled.img`
  margin-right: 6px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-right: 20px;
  }
`

const StyledButton = styled(Button)`
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

const NoPrizesContent: React.FC = () => {
  const TranslateString = useI18n()
  const tickets = useTickets()
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)

  return (
    <Wrapper>
      <StyledTitle>{TranslateString(999, 'The 2local Lottery')}</StyledTitle>
      <TextWrapper>
        <StyledText>{TranslateString(999, 'Sorry, no prizes to collect')}</StyledText>
        <StyledButton onClick={onPresentMyTickets}>
          {TranslateString(432, 'View your tickets')}
        </StyledButton>
      </TextWrapper>
    </Wrapper>
  )
}

export default NoPrizesContent
