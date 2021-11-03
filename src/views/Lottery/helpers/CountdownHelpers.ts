import getTimePeriods from 'utils/getTimePeriods'

export const getNextLotteryDrawTime = (currentMillis, lotteryId) => {
  const date = new Date(currentMillis)
  const currentHour = date.getUTCHours()
  const currentDay = date.getUTCDay()
  const nextLotteryHour = 14 // 02:00 PM
  const nextLotteryDay = 0 // Sun

  const isPass =  currentDay > nextLotteryDay || (currentDay === nextLotteryDay && currentHour >= nextLotteryHour)
  const tomorrow = new Date(currentMillis)
  const nextDay = isPass ? tomorrow.getUTCDate() + 7 - currentDay : tomorrow.getUTCDate()
  tomorrow.setUTCDate(nextDay)
  const millisTimeOfNextDraw = tomorrow.setUTCHours(nextLotteryHour, 0, 0, 0)

  return millisTimeOfNextDraw
}

// @ts-ignore
const getNextTicketSaleTime = (currentMillis) => (parseInt(currentMillis / 3600000) + 1) * 3600000
const hoursAndMinutesString = (days, hours, minutes) => `${parseInt(days)}d, ${parseInt(hours)}h, ${parseInt(minutes)}m`

export const getTicketSaleTime = (currentMillis): string => {
  const nextTicketSaleTime = getNextTicketSaleTime(currentMillis)
  const msUntilNextTicketSale = nextTicketSaleTime - currentMillis
  const { days, hours, minutes } = getTimePeriods(msUntilNextTicketSale / 1000)
  return hoursAndMinutesString(days, hours, minutes)
}

export const getLotteryDrawTime = (currentMillis, lotteryId): string => {
  const nextLotteryDrawTime = getNextLotteryDrawTime(currentMillis, lotteryId)
  const msUntilLotteryDraw = nextLotteryDrawTime - currentMillis
  const { days, hours, minutes } = getTimePeriods(msUntilLotteryDraw / 1000)
  return hoursAndMinutesString(days, hours, minutes)
}

export const getTicketSaleStep = () => (1 / 24) * 100

export const getLotteryDrawStep = (currentMillis, lotteryId) => {
  const msBetweenLotteries = 86400000
  const endTime = getNextLotteryDrawTime(currentMillis, lotteryId)
  let msUntilLotteryDraw = endTime - currentMillis
  const count = Math.floor(msUntilLotteryDraw / msBetweenLotteries)

  if (msUntilLotteryDraw > msBetweenLotteries) {
    msUntilLotteryDraw -= msBetweenLotteries * count
  }

  const percentageRemaining = (msUntilLotteryDraw / msBetweenLotteries) * 100
  return 100 - percentageRemaining
}
