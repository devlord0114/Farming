import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

const DisconnectButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()

  return (
    <Button onClick={reset} {...props}>
      {TranslateString(999, 'Disconnect')}
    </Button>
  )
}

export default DisconnectButton
