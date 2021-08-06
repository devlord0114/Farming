import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text, Link } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'

const StyledPlantedTreeCard = styled(Card)`
  background: linear-gradient(#e25581, #ff0050);
  align-items: center;
  display: flex;
  flex: 1;
  text-align: center;
  width: 100%;
  & > div {
    width: 100%;
    background-image: url('/images/bgtreecard-sx.png'), url('/images/bgtreecard-dx.png');
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: bottom left, bottom right;
    margint-bottom: 0px;
  }
`

const PlantedTreeCard = () => {
  const TranslateString = useI18n()
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledPlantedTreeCard>
      <CardBody>
        <Heading color="invertedContrast" size="lg" mb="24px">
          {TranslateString(762, '🌱 Total Planted Trees (TPT)')}
        </Heading>
        {data ? (
          <>
            {/* <Heading color="invertedContrast" size="xl">{`${tvl}`}</Heading> */}
            <Link external href='https://donation.goosedefi.com' style={{marginRight:'auto', marginLeft:'auto'}}>
              <Heading color="invertedContrast" size="xl">5000!</Heading>
            </Link>
            <Text color="invertedContrast">{TranslateString(764, 'We use one third of all deposit fees to plant trees around the world')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledPlantedTreeCard>
  )
}

export default PlantedTreeCard
