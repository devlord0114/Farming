import React from 'react'
import styled from 'styled-components'
import { Heading, Image, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'
import LotteryProgress from './LotteryProgress'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  background-image: linear-gradient(90deg, #ffeb59 0%, #8a0c2b 100%);
  padding-bottom: 40px;
  padding-top: 40px;

  @media screen and (min-width: 1080px) {
    margin-top: 130px;
  }

  @media screen and (max-width: 1080px) {
    margin-top: 50px;
  }
  margin-bottom: 80px;
`

const StyledContainer = styled(Container)`
  display: flex;

  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-left: 0;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0px;
    padding-left: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 32px;
  }
`

const ExplanationImage = styled.img`
  align-self: center;
  margin-top: 20px;
  margin-bottom: -70px;
`

const JackpotImage = styled.img`
  align-self: center;
  margin-top: -80px;
  margin-bottom: 50px;
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <StyledContainer>
        <JackpotImage src="/images/lottery/jackpot.svg" alt="ifo bunny" width="380px" height="180px" />        
        <RightWrapper>
          <LotteryProgress />
        </RightWrapper>
        <ExplanationImage src="/images/lottery/explanation.svg" alt="ifo bunny" width="380px" height="180px" />
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero
