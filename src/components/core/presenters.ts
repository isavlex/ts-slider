import {SliderModel} from '../models/models'
import {SliderView} from '../views/views'
import {customEvents} from '../../index'

export interface Options {
  selector: string
  currentValue: number
  minValue: number
  maxValue: number
  orientation?: string
  range?: boolean
  floatIndicator: boolean
}

export class ListPresenter {
  view: SliderView
  model: SliderModel
  options: Options
  constructor(options: Options) {
    this.options = options
    this.model = new SliderModel(this.options)
    this.view = new SliderView(this.model.get())
    this._init()
  }

  _init() {
    this.view.addClickHandler((value: number): void => {
      this.model.changeValue(value)
    })

    this.view.addMousedownHandler((value: number): void => {
      this.model.changeValue(value)
    })

    customEvents.subscribe('changeValue', (): void => {
      this.view._updateView()
    })
  }

  getView() {
    $(this.options.selector).append(this.view.getHtml())
  }
}
