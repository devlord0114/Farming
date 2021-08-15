import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@pancakeswap-libs/uikit'
import Question from 'components/QuestionHelper'
import { CommunityTag, CoreTag, NoFeeTag, RiskTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled.div`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  risk,
  farmImage,
  tokenSymbol,
  depositFee,
}) => {
  const TranslateString = useI18n()

  return (
    <Wrapper>
      <Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-start" mt="16px" mb="10px">
        <Flex>
          <Heading mb="4px">{lpLabel}</Heading>
        </Flex>
        {/* <Flex justifyContent="center">
          {depositFee === 0 ? <NoFeeTag /> : null}
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
        </Flex> */}
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
