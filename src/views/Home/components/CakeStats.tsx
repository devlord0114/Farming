import React from 'react'
import { Card, CardBody, Heading, Text, Flex } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import Question from 'components/QuestionHelper'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let localPerBlock = 0;
  if(farms && farms[0] && farms[0].localPerBlock){
    localPerBlock = new BigNumber(farms[0].localPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {/* <div className="token-tag">DEFLACTIONARY</div> */}
          {TranslateString(53401, '2LC Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
          {/* <CardValue fontSize="14px" value={0} decimals={0} prefix="$" /> */}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
          {/* {totalSupply && <CardValue fontSize="14px" value={0} decimals={0} />} */}
          </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
          {/* <CardValue fontSize="14px" value={0} decimals={0} /> */}
          </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
          {/* {cakeSupply && <CardValue fontSize="14px" value={0} decimals={0} />} */}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(5400, 'New 2LC/block')}</Text>
          <Text bold fontSize="14px">{localPerBlock}</Text>
          {/* <Text bold fontSize="14px">0.1</Text> */}
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
