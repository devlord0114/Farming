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
`

const DisplayValue = styled(Text)`
  min-width: 130px;
  text-align: end;
  font: normal normal bold 20px/35px Swis721 BT
`

const NumberArea = styled.div`
  width: 50px;
  height: 35px;
  background: transparent linear-gradient(180deg, #53A8F0 0%, #2D7FC4 100%);
  text-align: center;
  border-radius: 50px;
  margin-right: 5px;
`

const LotteryCardHeading: React.FC<HeadingProps> = ({ valueToDisplay, children, winning, ...props }) => {

  const renderValue = () => {
    if (winning) {
      const numbers = valueToDisplay.split(',')
      return numbers.map((number) => (
        <NumberArea>
          <WinningNumber>
            {number}
          </WinningNumber>
        </NumberArea>
      ))
    }

    return <DisplayValue>{valueToDisplay}</DisplayValue>
  }

  return (
    <Flex justifyContent="space-between">
      <FullWidthText >
        {children}
      </FullWidthText>
      {renderValue()}
    </Flex>
  )
}

LotteryCardHeading.defaultProps = {
  valueToDisplay: '',
  children: '',
  winning: false,
}

export default LotteryCardHeading
