import SliderModel from '../models/Models'
import SliderView from '../views/Views'
import { customEvents } from '../app/app'

export default class ListPresenter {
  view: SliderView

  model: SliderModel

  options: TsSliderOptions

  constructor(options: TsSliderOptions) {
    this.options = options
    this.model = new SliderModel(this.options)
    this.view = new SliderView(this.options, this.model.get())
    this.init()
  }

  private init() {
    this.view.addClickHandler((value: number, handle: string): void => {
      this.model.changeValue(value, handle)
    })

    this.view.addMouseDownHandler((value: number, handle: string): void => {
      this.model.changeValue(value, handle)
    })

    customEvents.makeSubscribe('changeValue', (): void => {
      this.view.updateView()
    })
  }

  getView() {
    $(this.options.selector).append(this.view.getHtml())
  }
}
