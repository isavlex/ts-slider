import { customEvents } from '../app/app'

export interface Idata {
  currentPosition: number
  currentValue: number
}

export class SliderModel {
  options: TsSliderOptions

  widthOfInterval: number

  data: Idata = {
    currentPosition: 0,
    currentValue: 0,
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
  private getValue() {
    const result = this.options.maxValue - (this.options.maxValue * this.data.currentPosition)
    / this.widthOfInterval
    return Math.round(result)
  }

  // set values of this.data
  private init() {
    this.data.currentPosition = this.widthOfInterval
    - this.getPosition(this.options.currentValue)
    this.data.currentValue = this.options.currentValue
  }

  changeValue(value: any) {
    this.data.currentPosition = value
    this.data.currentValue = this.getValue()
    customEvents.notify('changeValue')
  }
}
