import BigNumber from 'bignumber.js'

interface ObjectType {
  myreferrerdata: string
  token: string
  tvl: BigNumber
}
const myglobaldata: ObjectType = { myreferrerdata: null, token: '1', tvl: new BigNumber(0) }

export function changeToken(name: string) {
  myglobaldata.token = name
}

export function getToken() {
  return myglobaldata.token
}

export function setTvl(name: BigNumber) {
  myglobaldata.tvl = name
}

export function getTvl() {
  return myglobaldata.tvl
}
export default myglobaldata
