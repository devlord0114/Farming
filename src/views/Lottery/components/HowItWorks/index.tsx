import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link, Image, Flex } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import StepCard from './StepCard'
import config from './config'

const LayoutWrapper = styled.div`
  width: 100%;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const StyledImage = styled(Image)`
  align-self: center;
`

const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 16px;
`

const Title = styled(Text)`
  font: normal normal 1000 28px/30px Swis721 BT;
  display: flex;
  margin-bottom: 32px;
`

const StepCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const HowItWorks = () => {
  const TranslateString = useI18n()

  return (
    <LayoutWrapper>
      <Title>{TranslateString(999, 'How it works')}</Title>
      <StepCards>
        {config.map((item, i) => {
          return <StepCard index={i + 1} title={item.title} description={item.description} />
        })}
      </StepCards>
    </LayoutWrapper>
  )
}

export default HowItWorks
