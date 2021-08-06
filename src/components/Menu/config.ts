import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Exchange',
    icon: 'ExchangeIcon',
    href: '/',
    items: [
      {
        label: 'BNB',
        href: '/',
        icon: 'BNBIcon',
        items: [
          {
            label: '2LC',
            href: '/?coin=BNB&token=2LC',
            icon: 'L2LIcon',
          },
          {
            label: 'BUSD',
            href: '/?coin=BNB&token=BUSD',
            icon: 'BUSDIcon',
          },
          {
            label: 'BETH',
            href: '/?coin=BNB&token=BETH',
            icon: 'BETHIcon',
          },
        ],
      },
      // {
      //   label: "ETH",
      //   href: "/?coin=eth",
      //   icon: "ETHIcon",
      // },
      // {
      //   label: "USD",
      //   href: "/?coin=usd",
      //   icon: "USDIcon",
      // },
      // {
      //   label: "XLM",
      //   href: "/?coin=xlm",
      //   icon: "XLMIcon",
      // },
      // {
      //   label: "BTC",
      //   href: "/?coin=btc",
      //   icon: "BTCIcon",
      // },
    ],
  },
  {
    label: 'Pools',
    icon: 'LaunchPoolIcon',
    href: 'staking',
    items: [
      {
        label: 'Yield Farming',
        href: 'https://farms.2local.io',
        icon: 'BNB2LCIcon',
      },
      {
        label: 'Trading Pools',
        href: 'https://trading.2local.io',
        icon: 'BETH2LCIcon',
      },
      {
        label: 'Staking Pools',
        href: 'https://staking.2local.io',
        icon: 'BUSD2LCIcon',
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
        href: 'https://msend.2local.io',
        icon: 'BNB2LCIcon',
      },
    ],
  },
  {
    label: 'Airdrops',
    icon: 'AirdropIcon',
    href: '/airdrops',
    items: [
      {
        label: '2LC 2local',
        href: '/airdrops',
        icon: 'L2L2LCIcon',
      },
    ],
  },
  {
    label: 'NFT',
    icon: 'DiamondMenuIcon',
    href: '/airdrops',
    items: [
      {
        label: '2LC 2local',
        href: '/airdrops',
        icon: 'DiamondIcon',
      },
    ],
  },
]

export default config
