import {SliderModel} from '../models/models'
import {SliderView} from '../views/views'
import {customEvents} from '../../index'

export class ListPresenter {
  view: any
  model: any
  options: any
  constructor(options: any) {
    this.view
    this.model
    this.options = options
    this._init()
  }

  _init() {
    this.model = new SliderModel(this.options)
    this.view = new SliderView(this.model.get())

    this.view.addClickHandler((value: any) => {
      this.model.changeValue(value)
    })

    this.view.addMousedownHandler((value: any) => {
      this.model.changeValue(value)
    })

    customEvents.subscribe('changeValue', () => {
      this.view._updateView(this.model.get())
    })
  }

  getView() {
    $(this.options.selector).append(this.view.getHtml())
  }
}
