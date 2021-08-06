import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from './Providers'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
      {/* <a className="audit-container large visible" href="https://clawapp.toplegend.tech" target="_blank" rel="noreferrer">
        <span className="txt">Audited by</span>
        <img className="logo" src="https://app.treedefi.com/audit/techrate.png" alt="logo" />
        <img className="check" src="https://app.treedefi.com/audit/check-primary.svg" alt="logo" />
        <div className="mini-tag pending">PASSED</div>
      </a> */}
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
