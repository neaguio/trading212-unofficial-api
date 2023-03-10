export type YAxes = {
  max: number
  min: number
  scale: number
  margin: number
}

export type XAxes = {
  min: number
  max: number
  margin: number
}

export type Axes = {
  y: YAxes
  x: XAxes
}

export type MetaData = {
  pnl: PNL
  title: string
}

export type PNL = {
  nominal: number
  percentage: number
}
