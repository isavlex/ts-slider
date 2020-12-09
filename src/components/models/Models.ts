/* eslint-disable prefer-destructuring */
import { customEvents } from '../app/app'

export interface Idata {
  currentPositionRight: number
  currentValueRight: number
  currentPositionLeft: number
  currentValueLeft: number
}

export default class SliderModel {
  options: TsSliderOptions

  widthOfInterval: number

  data: Idata = {
    currentPositionRight: 0,
    currentValueRight: 0,
    currentPositionLeft: 0,
    currentValueLeft: 0,
  }

  constructor(options: TsSliderOptions) {
    this.options = options
    this.widthOfInterval = options.selector.offsetWidth
    this.init()
  }

  get() {
    return this.data
  }

  // return position relative to maxValue
  private getPosition(num: number) {
    return (this.widthOfInterval * num) / this.options.maxValue
  }

  // return value relative to position of handle
  private getValue(handle: string) {
    let result
    if (handle === 'right') {
      result = this.options.maxValue
        - (this.options.maxValue * this.data.currentPositionRight)
        / this.widthOfInterval
    } else {
      result = (this.options.maxValue * this.data.currentPositionLeft)
        / this.widthOfInterval
    }
    return Math.round(result)
  }

  // set values of this.data
  private init() {
    if (!this.options.range) {
      this.data.currentPositionRight = this.widthOfInterval
        - this.getPosition(this.options.currentValue[0])
      this.data.currentValueRight = this.options.currentValue[0]
    } else {
      this.data.currentPositionLeft = this.getPosition(this.options.currentValue[0])
      this.data.currentPositionRight = this.widthOfInterval
        - this.getPosition(this.options.currentValue[1])
      this.data.currentValueLeft = this.options.currentValue[0]
      this.data.currentValueRight = this.options.currentValue[1]
    }
  }

  changeValue(value: number, handle: string) {
    if (handle === 'right') {
      this.data.currentPositionRight = value
      this.data.currentValueRight = this.getValue('right')
      customEvents.notify('changeValue')
    } else {
      this.data.currentPositionLeft = value
      this.data.currentValueLeft = this.getValue('left')
      customEvents.notify('changeValue')
    }
  }
}
