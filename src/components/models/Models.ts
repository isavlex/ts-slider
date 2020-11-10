import { customEvents } from '../../index'
import { Options } from '../core/Presenters'

export type Idata = {
  $root: JQuery
  currentPosition: number
  currentValue: number
  range: boolean
  widthOfInterval: number | undefined
  tooltip: boolean
}

export class SliderModel {
  options: Options

  data: Idata = {
    $root: $(),
    currentPosition: 0,
    currentValue: 0,
    range: false,
    widthOfInterval: 0,
    tooltip: false,
  }

  constructor(options: Options) {
    this.options = options
    this.init()
  }

  get() {
    return this.data
  }

  // return position relative to maxValue
  private getPosition(num: number) {
    if (this.data.widthOfInterval) {
      return (this.data.widthOfInterval * num) / this.options.maxValue
    }
    throw new Error('this.data.widthOfInterval - undefined')
  }

  // return value relative to position of handle
  private getValue() {
    if (this.data.widthOfInterval) {
      const result = this.options.maxValue - (this.options.maxValue * this.data.currentPosition)
      / this.data.widthOfInterval
      return Math.round(result)
    }
    throw new Error('this.data.widthOfInterval - undefined')
  }

  // set values of this.data
  private init() {
    this.data.$root = $(this.options.selector)
    this.data.widthOfInterval = this.data.$root.width()
    if (this.data.widthOfInterval) {
      this.data.currentPosition = this.data.widthOfInterval
      - this.getPosition(this.options.currentValue)
    }
    this.data.range = !!this.options.range
    this.data.currentValue = this.options.currentValue
    this.data.tooltip = this.options.tooltip
  }

  changeValue(value: any) {
    this.data.currentPosition = value
    this.data.currentValue = this.getValue()
    customEvents.notify('changeValue')
  }
}
