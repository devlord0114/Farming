import getTimePeriods from 'utils/getTimePeriods'

// lottery draws UTC: 02:00 (10:00 SGT), 14:00 (22:00 SGT)
const lotteryDrawHoursUtc = [14, 2]

const getClosestLotteryHour = (currentHour) => {
  return lotteryDrawHoursUtc[0]
}

const getNextLotteryDrawTime = (currentMillis, lotteryId) => {
  const date = new Date(currentMillis)
  const currentHour = date.getUTCHours()
  const nextLotteryHour = getClosestLotteryHour(currentHour)
  console.log("pooh, nextLotteryHour = ", nextLotteryHour)
  console.log("pooh, currentHour = ", currentHour)
  // next lottery is tomorrow if the next lottery is at 2am UTC...
  // ...and current time is between 02:00am & 23:59pm UTC
  const nextLotteryIsTomorrow = nextLotteryHour === 2 && currentHour >= 2 && currentHour <= 23
  const tomorrow = new Date(currentMillis)
  const nextDay = tomorrow.getUTCDate() + 1
  tomorrow.setUTCDate(nextDay)
  const millisTimeOfNextDraw = tomorrow.setUTCHours(nextLotteryHour, 0, 0, 0)

  return millisTimeOfNextDraw
}

// @ts-ignore
const getNextTicketSaleTime = (currentMillis) => (parseInt(currentMillis / 3600000) + 1) * 3600000
const hoursAndMinutesString = (hours, minutes) => `${parseInt(hours)}h, ${parseInt(minutes)}m`

export const getTicketSaleTime = (currentMillis): string => {
  const nextTicketSaleTime = getNextTicketSaleTime(currentMillis)
  const msUntilNextTicketSale = nextTicketSaleTime - currentMillis
  const { minutes } = getTimePeriods(msUntilNextTicketSale / 1000)
  const { hours } = getTimePeriods(msUntilNextTicketSale / 1000)
  return hoursAndMinutesString(hours, minutes)
}

export const getLotteryDrawTime = (currentMillis, lotteryId): string => {
  const nextLotteryDrawTime = getNextLotteryDrawTime(currentMillis, lotteryId)
  const msUntilLotteryDraw = nextLotteryDrawTime - currentMillis
  const { minutes } = getTimePeriods(msUntilLotteryDraw / 1000)
  const { hours } = getTimePeriods(msUntilLotteryDraw / 1000)
  return hoursAndMinutesString(hours, minutes)
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
  console.log("pooh, msUntilLotteryDraw = ", msUntilLotteryDraw)
  console.log("pooh, msBetweenLotteries = ", msBetweenLotteries)
  const percentageRemaining = (msUntilLotteryDraw / msBetweenLotteries) * 100
  return 100 - percentageRemaining
}
