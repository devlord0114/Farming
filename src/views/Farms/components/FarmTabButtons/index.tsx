import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const FarmTabButtons = ({ stakedOnly, setStakedOnly }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()
  const history = useLocation()

  const getIndex = () => {
    switch(history.pathname) {
      case '/farms':
        return 0;
      case '/staking':
        return 0;
      case '/farms/oct' : 
        return 1;
      case '/staking/oct' : 
        return 1;
      case '/farms/partner' : 
        return 2;
      case '/staking/partner' : 
        return 2;
      case '/farms/history' :
        return 3;
      case '/staking/history' :
        return 3;
      default:
        return 0;
    }
  }

  return (
    <Wrapper>
      <ToggleWrapper>
        <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
        <Text> {TranslateString(699, 'Staked only')}</Text>
      </ToggleWrapper>
      <ButtonMenu activeIndex={getIndex()} size="sm" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {TranslateString(9999, 'All')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/oct`}>
          {TranslateString(9999, '2LC')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/partner`}>
          {TranslateString(9999, 'Partner')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          {TranslateString(700, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    display: block;
    text-align: -webkit-center;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;

  @media (max-width: 768px) {
    margin-bottom : 10px;
  }
  ${Text} {
    margin-left: 8px;
  }
`