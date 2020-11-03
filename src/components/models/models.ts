import {customEvents} from '../../index'

export class SliderModel {
  options: any
  data: any
  constructor(options: any) {
    this.options = options
    this.data = {}
    this._init()
  }

  get() {
    return this.data
  }

  // return position relative to maxValue
  _getPosition(num: number) {
    return this.data.widthOfInterval * num / this.options.maxValue
  }
  // return value relative to position of handle
  _getValue() {
    return this.options.maxValue - (this.options.maxValue * this.data.currentPosition / this.data.widthOfInterval)
  }

  _init() {
    this.data.$root = $(this.options.selector)
    this.data.widthOfInterval = this.data.$root.width()
    this.data.currentPosition = this.data.widthOfInterval - this._getPosition(this.options.currentValue)
    this.data.range = this.options.range ? true : false
    this.data.currentValue = this.options.currentValue
  }

  changeValue(value: any) {
    this.data['currentPosition'] = value
    this.data['currentValue'] = this._getValue()
    customEvents.notify('changeValue', {})
  }
}

