import React, { useCallback, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Text } from '@pancakeswap-libs/uikit'

const HeaderRow = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  margin-right: 100px;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 22%;
  }
`

const StyledFooter = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }

  margin-top: 150px;
  margin-bottom: 50px;
  margin-left: 70px;
  width: 90%;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.textSubtle};
  height: 1px;
  margin: 32px 0;
  width: 90%;
  opacity: 0.1;
`

const Logo = styled.img`
  width: 40%;
  min-width: 130px;
  max-width: 130px;
  margin-bottom: 20px;
`

const Description = styled(Text)`
  font: normal normal 25px/40px Swis721 BT;
  opacity: .6;
  font-size: 1.25rem;
  line-height: 1.75rem;
`

const LinkContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 17%;
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: row;

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-flow: column;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-flow: column;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-flow: column;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-flow: row;
  }
`

const Title = styled(Text)`
  font: normal bold 25px/40px Swis721 BT;
  opacity: .5;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
`

const Item = styled.a`
  font: normal normal 25px/40px Swis721 BT;
  font-size: 1.25rem;
  line-height: 1.75rem;
  border-color: rgba(229,231,235,1);
  opacity: .6;
`

export default function Footer() {
  return (
    <StyledFooter>
      <Divider/>
      <Container>
        <HeaderRow>
          <Logo src='/images/2local/Logo.svg' alt='logo' />
          <Description> 2local is a platform with the goal to achieve a sustainable world with prosperity for all. </Description>
        </HeaderRow>
        <LinkContainer>
          <Title>Services</Title>
          <Item href="https://2local.io/apps?_branch_match_id=946025435582633366">App</Item>
          <Item href="https://demo.2local.io/exchange">Demo Exchange</Item>
          <Item href="https://blog.2local.io/">Blog</Item>
          <Item href="https://sec.2local.io/login">Sign In or Sign Up</Item>
        </LinkContainer>
        <LinkContainer>
          <Title>Support</Title>
          <Item href="https://mijno.nl/2local/2021/06/05/add-2local-to-your-trustwallet/">Tutorial</Item>
          <Item href="mailto:info@2local.io">Mail Helpdesk</Item>
        </LinkContainer>
        <LinkContainer>
          <Title>Company</Title>
          <Item href="https://2local.io/team">Team</Item>
          <Item href="https://bscscan.com/token/0x111763fb1D088Bf4f058ee8e38ec35cc0E805Ecc">2LC Contract</Item>
          <Item href="https://2local.io/public/uploads/docs/terms_of_use.pdf">Terms of Use</Item>
          <Item href="https://www.certik.org/projects/2local">Audit Report 2LC</Item>
        </LinkContainer>
        <LinkContainer>
          <Title>Github</Title>
          <Item href="https://github.com/2local/Yield_Farm_2LC">Yield Farm</Item>
          <Item href="https://github.com/2local/Factory">Factory</Item>
          <Item href="https://github.com/2local/Router">Router</Item>
          <Item href="https://github.com/2local/2LC_Token.git">2LC Token</Item>
          <Item href="https://github.com/2local/2local_HeX_ts">Exchange Swap</Item>
          <Item href="https://github.com/2local/Staking-Pool-Public">Staking Pool</Item>
        </LinkContainer>
      </Container>
      <Divider/>
    </StyledFooter>
  )
}
