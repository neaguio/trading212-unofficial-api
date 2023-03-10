import { CurrentCandle, InputGetCandles } from '../types'

export default async function getCurrentCandle(input: CurrentCandle[] | CurrentCandle) {
  // Check if there are multiple inputs.

  const candles = Array.isArray(input) ? input : [input]
  const newCandlesInput = candles.map((el: CurrentCandle): InputGetCandles => {
    const { showPreviousPrice, ...rest } = el
    const size = showPreviousPrice ? 2 : 1
    return { ...rest, size, useAskPrice: false }
  })

  const data = await fetch('https://live.trading212.com/charting/v3/candles', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      candles: newCandlesInput,
    }),
    method: 'PUT',
  })
    .then((d) => d.json())
    .catch((err) => err)
  return data
}
