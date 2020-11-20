import { SliderModel } from '../models/Models'
import SliderView from '../views/Views'
// import { customEvents } from '../../index'
import { customEvents } from '../app/app'

export interface Options {
  selector: string
  currentValue: number
  minValue: number
  maxValue: number
  orientation?: string
  range?: boolean
  tooltip: boolean
}

export class ListPresenter {
  view: SliderView

  model: SliderModel

  options: Options

  constructor(options: Options) {
    this.options = options
    this.model = new SliderModel(this.options)
    this.view = new SliderView(this.model.get())
    this.init()
  }

  private init() {
    this.view.addClickHandler((value: number): void => {
      this.model.changeValue(value)
    })

    this.view.addMousedownHandler((value: number): void => {
      this.model.changeValue(value)
    })

    customEvents.makeSubscribe('changeValue', (): void => {
      this.view.updateView()
    })
  }

  getView() {
    $(this.options.selector).append(this.view.getHtml())
  }
}
