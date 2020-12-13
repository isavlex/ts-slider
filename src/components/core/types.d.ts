declare interface TsSliderOptions {
  selector: HTMLElement
  currentValue: number[]
  minValue: number
  maxValue: number
  orientation?: string
  range?: boolean
  separator?: string
  scale: boolean
  stepsOfScale: number | number[]
  tooltip: boolean
}
