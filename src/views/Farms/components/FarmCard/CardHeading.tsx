import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@pancakeswap-libs/uikit'
import "@google/model-viewer/dist/model-viewer-umd"
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerJSX & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> ;
    }
  }
}

interface ModelViewerJSX {
  src: string
  poster?: string
  alt?: string
}

interface ModelViewerElement extends Element {
  model: {
    materials: Array<{
      name: string,
      pbrMetallicRoughness: {
        setBaseColorFactor: ((x: [number, number, number, number]) => void),
        setMetallicFactor: ((x: number) => void),
        setRoughnessFactor: ((x: number) => void),

        baseColorTexture: null | {
          texture: {
            source: {
              setURI: ((x: string) => void),
            }
          }
        }
        metallicRoughnessTexture: null | {
          texture: {
            source: {
              setURI: ((x: string) => void),
            }
          }
        }
        // ... others
      }
    }>
  }
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
      <model-viewer src={`/images/farms/${farmImage}.glb`} alt="A 3D model of an astronaut" ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls />
      <Flex flexDirection="column" alignItems="flex-start" mt="70px" mb="10px">
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
