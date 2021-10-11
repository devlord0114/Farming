import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text } from '@pancakeswap-libs/uikit'

interface HeadingProps {
  valueToDisplay?: string
  children?: string
  winning?: boolean
}

const IconWrapper = styled.div`
  svg {
    width: 48px;
    height: 48px;
  }
`

const FullWidthText = styled(Text)`
  width: 100%;
  font: normal normal bold 16px/35px Swis721 BT
`

const WinningNumber = styled(Text)`
  font: normal normal bold 16px/35px Swis721 BT;
  color: #ffffff;
  min-width: 35px;
  max-width: 35px;
  height: 35px;
  background: transparent linear-gradient(180deg, #53A8F0 0%, #2D7FC4 100%);
  text-align: center;
  border-radius: 50px;
  margin-left: 5px;
  margin-right: 0px;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 0px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 5px;
    margin-right: 0px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin-left: 5px;
    margin-right: 0px;
  }
`

const DisplayValue = styled(Text)`
  min-width: 130px;
  text-align: end;
  font: normal normal bold 20px/35px Swis721 BT
`

const NumberArea = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledFlex = styled(Flex)`
  display: flex;
  flex-direction: row;
  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`

const LotteryCardHeading: React.FC<HeadingProps> = ({ valueToDisplay, children, winning, ...props }) => {

  const renderValue = () => {
    if (winning) {
      const numbers = valueToDisplay.split(',')
      return numbers.map((number) => (
        <WinningNumber>
          {number}
        </WinningNumber>
      ))
    }

    return <DisplayValue>{valueToDisplay}</DisplayValue>
  }

  return (
    <StyledFlex>
      <FullWidthText >
        {children}
      </FullWidthText>
      <NumberArea>
        {renderValue()}
      </NumberArea>
    </StyledFlex>
  )
}

LotteryCardHeading.defaultProps = {
  valueToDisplay: '',
  children: '',
  winning: false,
}

export default LotteryCardHeading
