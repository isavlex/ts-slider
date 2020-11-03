import {dragAndDropHandler} from './dragAndDropHandler'

export class SliderView {
  data: any
  html: any
  constructor(data: any) {
    this.data = data
    this.html = ''
    this._init(data)
  }

  _updateView(data: any) {
    this.html.find('[data-type="interval"]').css('right', this.data.currentPosition + 'px')
    this.html.find('[data-type="value"]').text(this.data.currentValue)
  }

  _init(initialData: any) {
    if (!this.data.range) {
      console.log(this.data)
      this.html = $(`<div class="range-slider">
                    <div class="range-slider__head">
                      <h4 data-type="value" class="range-slider__value">${this.data.currentValue}</h4>
                    </div>
                    <div data-type="body" class="range-slider__body">
                      <div data-type="interval" class="range-slider__interval">
                        <div data-type="r-handle" class="range-slider__handle range-slider__handle--right"></div>
                      </div>
                    </div>
                  </div>`)
    }
    this._updateView(initialData)
  }

  getHtml() {
    return this.html
  }

  addClickHandler(handler: any) {
    this.html.find('[data-type="body"]').click((e: any) => {
      if (e.target.dataset.type !== 'r-handle') {
        const newValue = this.data.widthOfInterval - e.offsetX
        handler(newValue)
      }
    })
  }

  addMousedownHandler(handler: any) {
    this.html.find('[data-type="r-handle"]').mousedown((e: any) => {
      dragAndDropHandler(e, handler, this.data.widthOfInterval)
    })
  }
}
