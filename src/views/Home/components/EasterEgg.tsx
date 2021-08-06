import React from 'react'
import styled from 'styled-components'
import { Modal } from '@pancakeswap-libs/uikit'

const PopupTitle = styled.div`
  color: #39964e;
`

const TwikText = styled.p`
  font-size: 14px;
  color: #868686;
  margin-bottom: 24px;
  margin-top: -12px;
`

const TwikLink = styled.a`
  text-decoration: none;
  font-size: 14px;
  color: #868686;
`

const TwitterLink = styled.a`
  color: #ffffff;
  background-color: #2bc22e;
`

const DescriptionText = styled.p`
  color: #686868;
`

const TitleArea = styled.div`
  color: #000000;
`

interface EasterProps {
  onDismiss?: () => void
}

const EasterEgg: React.FC<EasterProps> = ({ onDismiss }) => {

  return (
    <Modal title="Easter Egg" onDismiss={onDismiss}>
      <div
        className="sm-button"
        data-sm-button-style="cancel simple"
        data-sm-button-align="right"
        data-sm-button-place="inside"
        data-sm-button-text="X"
        data-sm-close="true"
      />
      <div id="popup-container" className="popup-container image-on-top" data-sm-init="false" data-state="success">
        <div className="popup-half-column">
          <PopupTitle className="popup-subtitle">
            Happy easter!
            <img className="emoji" alt="🐣" src="https://s.w.org/images/core/emoji/13.0.0/svg/1f423.svg" />
          </PopupTitle>
          <TitleArea className="popup-title smaller-title">
            You<span>&#39;</span>ve unveiled our Easter Secret!
          </TitleArea>
          <DescriptionText className="popup-description">
            To participate in your well deserved prize draw send a tweet @treedefi with your findings. Hurry up before
            someone else finds the solution to the mystery before you!
          </DescriptionText>
          <div id="temp-countdown" className="placeholder-section" />
          <div className="button-group round vertical" style={{display:'flex', width:'100%', }}>
            <TwitterLink style={{borderRadius:'30px'}}
              href="https://twitter.com/intent/tweet?text=Happy%20Easter!%20I%20just%20won%20the%20EasterEgg%20Hunt%20in%20the%20%40treedefi%20Yield%20Farming!%20Find%20the%20hidden%20easter%20egg%20on%20https%3A%2F%2Fapp.treedefi.com%20%2C%20and%20you%20will%20partecipate%20to%20the%20draw%20for%205%20TREE%20%2B%205%20SEED%20(It%27s%20over%20%24750)!%20%23treedefi%20%23BSC%20%23BinanceSmartChain%20%23YieldFarming%20%23DeFi%20%23bnb"
              className="popup-button popup-main-button w-button popup-button1"
            >
              <b>Share &amp; Enter the draw</b>
            </TwitterLink>
            <div id="temp-button2" className="placeholder-section" />
          </div>
          <TwikText>
            © Free
            <TwikLink href="https://www.twik.io/resources/popup-generator/" target="_blank">
              popup generator
            </TwikLink>
            by Twik
          </TwikText>
        </div>
        <div className="popup-half-column popup-image-full">
          <img className="popup-image" src="/images/titleImage.jpg" sizes="(max-width: 991px) 100vw, 390px" alt="" />
        </div>
      </div>
    </Modal>
  )
}

export default EasterEgg
