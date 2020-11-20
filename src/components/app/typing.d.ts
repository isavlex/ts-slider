/* eslint-disable @typescript-eslint/no-unused-vars */
declare global {
  interface JQuery {
    tsSlider(options?: any): JQuery
  }
}

export interface TsSliderOptions {
  selector: string
  currentValue: number
  minValue: number
  maxValue: number
  orientation?: string
  range?: boolean
  tooltip: boolean
}

declare namespace App {
  interface Options {
    currentValue: number
    minValue: number
    maxValue: number
    orientation?: string
    range?: boolean
    tooltip: boolean
  }
}
