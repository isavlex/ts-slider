import {customEvents} from '../../index'
import {Options} from '../core/presenters'

export type Idata = {
  $root: JQuery
  currentPosition: number
  currentValue: number
  range: boolean
  widthOfInterval: number | undefined
}

export class SliderModel {
  options: Options
  data: Idata = {
    $root: $(),
    currentPosition: 0,
    currentValue: 0,
    range: false,
    widthOfInterval: 0
  }
  constructor(options: Options) {
    this.options = options
    this._init()
  }

  get() {
    return this.data
  }

  // return position relative to maxValue
  _getPosition(num: number) {
    if (this.data.widthOfInterval) {
      return (this.data.widthOfInterval * num) / this.options.maxValue
    } else {
      throw new Error('this.data.widthOfInterval - undefined')
    }
  }
  // return value relative to position of handle
  _getValue() {
    if (this.data.widthOfInterval) {
      return (
        this.options.maxValue -
        (this.options.maxValue * this.data.currentPosition) /
          this.data.widthOfInterval
      )
    } else {
      throw new Error('this.data.widthOfInterval - undefined')
    }
  }
  // set values of this.data
  _init() {
    this.data.$root = $(this.options.selector)
    this.data.widthOfInterval = this.data.$root.width()
    if (this.data.widthOfInterval) {
      this.data.currentPosition =
        this.data.widthOfInterval - this._getPosition(this.options.currentValue)
    }
    this.data.range = this.options.range ? true : false
    this.data.currentValue = this.options.currentValue
  }

  changeValue(value: any) {
    this.data['currentPosition'] = value
    this.data['currentValue'] = this._getValue()
    customEvents.notify('changeValue')
  }
}
