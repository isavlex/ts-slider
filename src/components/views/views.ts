import {Idata} from '../models/models'

export class SliderView {
  data: Idata
  html: JQuery = $()
  constructor(data: Idata) {
    this.data = data
    this._init()
  }

  _updateView() {
    this.html.find('[data-type="interval"]').css('right', this.data.currentPosition + 'px')
    this.html.find('[data-type="value"]').text(this.data.currentValue)
  }

  _init() {
    if (!this.data.range) {
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
    this._updateView()
  }

  getHtml() {
    return this.html
  }

  addClickHandler(handler: (value: number) => void) {
    this.html.find('[data-type="body"]').on('click', (e: JQuery.ClickEvent) => {
      if (e.target.dataset.type !== 'r-handle') {
        let newValue = 1
        if (this.data.widthOfInterval) {
          newValue = this.data.widthOfInterval - e.offsetX
        }
        handler(newValue)
      }
    })
  }

  addMousedownHandler(handler: (value: number) => void) {
    this.html.find('[data-type="r-handle"]').on('mousedown', (e: JQuery.MouseDownEvent) => {
      const handle = e.target
      const parent = $(handle.closest('[data-type="interval"]'))
      const coords = handle.getBoundingClientRect()
      const rightValue = parseInt($(parent).css('right'))
      $(document).on('mousemove', (event: JQuery.MouseMoveEvent) => {
        const delta = event.pageX - coords.left
        const setRight = rightValue - delta
        if (setRight >= 0 && this.data.widthOfInterval && setRight <= this.data.widthOfInterval) {
          handler(setRight)
        }
      })

      $(document).on('mouseup', () => {
        $(document).off('mousemove')
      })
    })
  }
}
