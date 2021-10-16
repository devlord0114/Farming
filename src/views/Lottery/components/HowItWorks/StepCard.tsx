import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link, Image, Flex } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

interface Props {
  index: number
  title: string
  description: string
}

const LayoutWrapper = styled.div`
  grid-template-columns: repeat(1, 1fr);
  padding: 15px;
`

const Index = styled(Text)`
  text-align: right;
  font: normal normal bold 16px/26px Swis721 BT;
  letter-spacing: 0px;
  color: #53A8F0;
  opacity: 1;
  margin-right: 20px;
`

const Title = styled(Text)`
  font: normal normal bold 20px/36px Swis721 BT;
  letter-spacing: 0.4px;
  color: #1D2943;
  opacity: 1;
`

const Description = styled(Text)`
  font: normal normal normal 16px/26px Swis721 BT;
  letter-spacing: 0.05px;
  color: #1D2943;
  opacity: 0.5;
`

const StepCard: React.FC<Props> = ({index, title, description}) => {

  return (
    <LayoutWrapper>
      <Flex justifyContent="space-between">
        <Title fontSize="16px">{title}</Title>
        <Index fontSize="16px">{`Step ${index}`}</Index>
      </Flex>
      <Description fontSize="16px">{description}</Description>
    </LayoutWrapper>
  )
}

export default StepCard
