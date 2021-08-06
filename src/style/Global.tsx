import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  a {
    text-decoration: none;
  }
  
  .txt {
    position: relative;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
  }
  
  .audit-container.visible {
    opacity: 1;
    pointer-events: auto;
  }
  
  .audit-container {
    position: fixed;
    display: flex;
    height: 50px;
    bottom: 25px;
    right: 40px;
    background-color: #fff;
    border-radius: 20px;
    align-items: center;
    padding: 13px 25px;
    z-index: 10;
    opacity: 0;
    transition: opacity .3s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    pointer-events: none;
  }
    
  .audit-container.large>.txt {
    margin-right: 10px;
    color: #5c6d78;
    font-size: 14px;
    white-space: nowrap;
  }
  
  .audit-container.large>.logo {
    width: 100px;
    margin-right: 10px;
  }
  
  .audit-container.large>.check {
    height: 8px;
  }
  
  .audit-container.large>.pending {
    position: absolute;
    left: -15px;
    top: -15px;
  }
  
  .mini-tag {
    font-family: 'Montserrat', sans-serif;
    position: relative;
    display: block;
    font-size: 11px;
    font-weight: 800;
    background-color: #10ac68;
    border-radius: 8px ;
    border: #10ac68 2px solid;
    padding: 2px 4px;
    color: #fff;
    box-shadow: 0 0 15px #10ac68;
  }

  .token-tag {
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    right: 20px;
    display: block;
    font-size: 11px;
    font-weight: 800;
    background-color: #10ac68;
    border-radius: 8px ;
    border: #10ac68 2px solid;
    padding: 2px 4px;
    color: #fff;
  }

  .ribbon-wrapper {
    width: 85px;
    height: 88px;
    overflow: hidden;
    position: absolute;
    top: -3px;
    left: -3px;
    .ribbon {
      font: bold 15px sans-serif;
      color: #fff !important;
      text-align: center;
      -webkit-transform: rotate(-45deg);
      -moz-transform:    rotate(-45deg);
      -ms-transform:     rotate(-45deg);
      -o-transform:      rotate(-45deg);
      position: relative;
      padding: 7px 0;
      top: 15px;
      left: -30px;
      width: 120px;
      background-color: rgb(59, 183, 143);
    }
  }
`

export default GlobalStyle
