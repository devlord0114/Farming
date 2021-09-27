import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Exchange',
    icon: 'ExchangeIcon',
    href: 'https://exchange.2local.io/#/',
    items: [
      {
        label: 'BNB (BEP20)',
        href: 'https://exchange.2local.io/#/',
        icon: 'BNBIcon',
        items: [
          {
            label: '2LC',
            href: 'https://exchange.2local.io/#/?coin=BNB&token=2LC',
            icon: 'L2LIcon',
            disabled: false,
          },
          {
            label: 'ETH (BEP20)',
            href: 'https://exchange.2local.io/#/?coin=BNB&token=ETH',
            icon: 'ETHIcon',
            disabled: false,
          },
          {
            label: 'CAKE',
            href: 'https://exchange.2local.io/#/?coin=BNB&token=CAKE',
            icon: 'CAKEIcon',
            disabled: false,
          },
          {
            label: 'UNI',
            href: 'https://exchange.2local.io/#/?coin=BNB&token=UNI',
            icon: 'UNIIcon',
            disabled: false,
          },
          {
            label: 'BTCB',
            href: 'https://exchange.2local.io/#/?coin=BNB&token=BTCB',
            icon: 'BTCIcon',
            disabled: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Pools',
    icon: 'LaunchPoolIcon',
    href: 'staking',
    items: [
      {
        label: 'Liquidity 2LC-LP',
        href: 'https://exchange.2local.io/#/pool',
        icon: 'BNB2LCIcon',
        disabled: false,
      },
      {
        label: 'Yield Farming',
        href: '/',
        icon: 'BNB2LCIcon',
        disabled: false,
      },
      {
        label: 'Trading Pools',
        href: 'https://exchange.2local.io/#/trading',
        icon: 'BETH2LCIcon',
        disabled: true,
      },
      {
        label: 'Staking Pools',
        href: 'https://staking.2local.io/',
        icon: 'BUSD2LCIcon',
        disabled: false,
      },
    ],
  },
  {
    label: 'Dapps',
    icon: 'YieldFarmingIcon',
    href: 'dapp',
    items: [
      {
        label: 'Multi-send',
        href: 'https://msend.2local.io/',
        icon: 'BNB2LCIcon',
        disabled: true,
      },
    ],
  },
  {
    label: 'Rewards',
    icon: 'RewardsIcon',
    href: '/airdrops',
    items: [
      {
        label: 'Airdrops',
        href: '/airdrops',
        icon: 'AirdropIcon',
        disabled: true,
      },
      {
        label: 'Lottery',
        href: '/lottery',
        icon: 'LotteryIcon',
        disabled: true,
      },
      {
        label: 'Prediction',
        href: '/prediction',
        icon: 'PredictionIcon',
        disabled: true,
      },
    ],
  },
  {
    label: 'NFT',
    icon: 'DiamondMenuIcon',
    href: '/nft',
    items: [
      {
        label: 'NFT Exchange',
        href: '/nft',
        icon: 'DiamondIcon',
        disabled: true,
      },
    ],
  },
]

export default config
