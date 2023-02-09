const data: [number, number, number, number, number, number][] = [[1675220400000,130.017,130.068,129.976,130.007,4692],[1675224000000,130.008,130.269,130.003,130.25,4969],[1675227600000,130.25,130.317,130.202,130.29,5023],[1675231200000,130.292,130.323,130.186,130.267,5030],[1675234800000,130.27,130.406,130.145,130.172,5132],[1675238400000,130.172,130.232,129.917,129.939,5157],[1675242000000,129.941,129.977,129.798,129.872,5209],[1675245600000,129.875,129.961,129.773,129.82,5127],[1675249200000,129.82,129.849,129.711,129.805,5073],[1675252800000,129.806,129.861,129.663,129.843,5058],[1675256400000,129.843,129.856,129.307,129.372,5233],[1675260000000,129.373,129.538,129.295,129.325,5247],[1675263600000,129.306,129.673,129.189,129.25,5314],[1675267200000,129.246,129.36,129.226,129.27,5333],[1675270800000,129.27,129.332,129.226,129.229,5157],[1675274400000,129.228,129.449,129.227,129.31,5000],[1675278000000,129.324,129.86,128.54,128.754,5043],[1675281600000,128.754,129.15,128.652,128.824,5127],[1675285200000,128.826,129.071,128.813,128.882,5128],[1675288800000,128.898,128.956,128.797,128.914,3292],[1675292400000,128.915,128.915,128.412,128.6,5191],[1675296000000,128.601,128.62,128.171,128.454,5289],[1675299600000,128.453,128.757,128.427,128.6,5221],[1675303200000,128.6,128.637,128.501,128.515,5206],[1675306800000,128.517,128.624,128.447,128.603,5040],[1675310400000,128.602,128.606,128.394,128.443,4809],[1675314000000,128.443,128.609,128.4,128.599,5045],[1675317600000,128.6,128.783,128.559,128.657,5134],[1675321200000,128.66,128.704,128.536,128.654,5101],[1675324800000,128.655,129.108,128.552,128.89,5146],[1675328400000,128.888,129.111,128.802,128.917,5229],[1675332000000,128.916,129.005,128.836,128.902,5152],[1675335600000,128.9,128.915,128.677,128.718,5105],[1675339200000,128.719,128.796,128.3,128.403,5328],[1675342800000,128.402,128.487,128.078,128.419,5271],[1675346400000,128.416,128.763,128.082,128.674,5319],[1675350000000,128.673,128.908,128.345,128.411,5380],[1675353600000,128.411,128.549,128.244,128.45,5285],[1675357200000,128.451,128.529,128.307,128.485,5143],[1675360800000,128.484,128.592,128.413,128.523,5084],[1675364400000,128.523,128.67,128.473,128.632,5210],[1675368000000,128.633,128.759,128.616,128.746,5080],[1675371600000,128.747,128.75,128.61,128.61,4886],[1675375200000,128.609,128.664,128.534,128.614,3643],[1675378800000,128.612,128.765,128.597,128.762,4983],[1675382400000,128.762,128.821,128.533,128.617,5267],[1675386000000,128.617,128.78,128.564,128.702,5125],[1675389600000,128.701,128.702,128.537,128.566,5207],[1675393200000,128.565,128.584,128.443,128.554,4942],[1675396800000,128.555,128.606,128.504,128.533,4966],[1675400400000,128.534,128.645,128.501,128.603,5159],[1675404000000,128.606,128.654,128.537,128.556,5178],[1675407600000,128.555,128.688,128.471,128.608,5112],[1675411200000,128.607,128.718,128.588,128.707,5245],[1675414800000,128.704,128.704,128.544,128.555,5083],[1675418400000,128.557,128.608,128.423,128.467,5156],[1675422000000,128.465,128.497,128.365,128.391,5066],[1675425600000,128.394,128.462,128.325,128.427,5142],[1675429200000,128.427,130.196,128.366,129.95,5022],[1675432800000,129.945,130.469,129.85,130.325,5150],[1675436400000,130.335,131.173,130.335,131.069,5293],[1675440000000,131.064,131.082,130.832,131.071,5464],[1675443600000,131.072,131.19,130.941,131.046,5341],[1675447200000,131.046,131.162,130.963,131.105,5230],[1675450800000,131.104,131.15,131.023,131.054,5215],[1675454400000,131.054,131.154,131.042,131.139,5149],[1675458000000,131.14,131.196,131.128,131.19,4606],[1675634400000,132.187,132.24,131.673,131.848,4245],[1675638000000,131.838,132.061,131.506,132.053,5175],[1675641600000,132.057,132.278,131.885,132.267,3763]]
export default async function toSvg() {
  const SVG_WIDTH = 324
  const SVG_HEIGHT = 180

  const maximumPrice = data.reduce((currMax, [_, _a, dataY]) => Math.max(currMax, dataY), -Infinity)
  const minimumPrice = data.reduce((currMin, [_, _a, _b, dataY]) => Math.min(currMin, dataY), Infinity)

  const yMax = maximumPrice * 1.004
  const yMin = minimumPrice * 0.996

  const xMin = 40
  const xMax = SVG_WIDTH - xMin

  // Define the scale factor for the y-axis
  let yScale = SVG_HEIGHT / (yMax - yMin)

  // Define the transform function for the y-axis
  let yTransform = (value: number) => SVG_HEIGHT - (value - yMin) * yScale
  

  // const numYTicks = 5;
  const barPlotWidth = (xMax - xMin) / data.length
  let xTransform = (i: number) => xMin + i * barPlotWidth

  const pnlNominal = data[data.length - 1][4] - data[0][4]
  const startValue = data[0][4]
  const pnlPercentage = (pnlNominal / startValue) * 100

  const title = 'TITLE'

  return (
    `<svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" style="border:1px solid gray">` +
    `<g transform="translate(0, ${SVG_HEIGHT}) scale(1, -1)">` +
    `<g transform="translate(0, ${SVG_HEIGHT}) scale(1, -1)"><text fill="#ddd" style="font-size:8px" x="${
      xMax / 2
    }" y="${yTransform(minimumPrice) + 8}"> min ${yMin.toFixed(4)}</text></g>` +
    `<g transform="translate(0, ${SVG_HEIGHT}) scale(1, -1)"><text fill="#ddd" style="font-size:8px" x="${
      xMax / 2
    }" y="${yTransform(maximumPrice) - 2}"> max ${yMax.toFixed(4)}</text></g>` +
    `<line x1="${xMin}" y1="${yTransform(minimumPrice)}" x2="${xMax}" y2="${yTransform(
      minimumPrice,
    )}" stroke="#ddd" />` +
    `<line x1="${xMin}" y1="${yTransform(maximumPrice)}" x2="${xMax}" y2="${yTransform(
      maximumPrice,
    )}" stroke="#ddd" />` +
    `${data
      .map(([_, open, high, low, close], index) => {
        let xB = xTransform(index)
        let OPEN = yTransform(open)
        let HIGH = yTransform(high)
        let LOW = yTransform(low)
        let CLOSE = yTransform(close)
        return `<g transform="translate(0, ${SVG_HEIGHT}) scale(1, -1)"> 
            <line x1="${xB + (barPlotWidth * 0.9) / 2}" y1="${HIGH}" x2="${
          xB + (barPlotWidth * 0.9) / 2
        }" y2="${LOW}" stroke="${OPEN - CLOSE > 0 ? '#1f8a1f' : '#720c00'}" />
            <rect
              x="${xB}"
              y="${Math.min(CLOSE, OPEN)}"
              width="${barPlotWidth * 0.9}"
              height="${Math.abs(OPEN - CLOSE)}"
              fill="${OPEN - CLOSE > 0 ? '#00eb00' : '#ec0000'}"
              stroke="${OPEN - CLOSE > 0 ? '#1f8a1f' : '#720c00'}"
            />  
            </g>`
      })
      .join('')}` +
    `</g>` +
    `<text style="font-family:Arial;font-weight:bold; font-size:24px" x="4" y="24" fill="#909090">${title}</text>` +
    `<text style="font-family:Arial;font-weight:600;font-size:13px" x="${(xMax + xMin) / 2}" y="10" fill="${
      pnlPercentage ? '#2ea82e' : '#ca0c0c'
    }">${pnlNominal > 0 ? '+' : '-'}${pnlNominal.toFixed(2)} (${pnlPercentage.toFixed(2)}%)</text>` +
    +`</svg>`
  )
}