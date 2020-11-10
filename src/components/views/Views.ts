import { Idata } from '../models/Models'
import FieldValue from './fieldValue/FieldValue'
import Tooltip from './tooltip/Tooltip'

export default class SliderView {
  data: Idata

  html: JQuery = $()

  constructor(data: Idata) {
    this.data = data
    this.init()
  }

  get getData() {
    return this.data
  }

  public updateView() {
    this.html
      .find('[data-type="interval"]')
      .css('right', `${this.data.currentPosition}px`)
    this.html.find('[data-type="value"]').text(this.data.currentValue)
  }

  private init() {
    if (!this.data.range) {
      const tooltip = new Tooltip(this.data.tooltip)
      const fieldValue = new FieldValue(this.data.tooltip)
      this.html = $(
        `<div class="range-slider">
          ${fieldValue.getField(this.data.currentValue)}
        <div data-type="body" class="range-slider__body">
          <div data-type="interval" class="range-slider__interval">
            <div data-type="r-handle"
            class="range-slider__handle 
            range-slider__handle--right">
              ${tooltip.getTooltip(this.data.currentValue)}
            </div>
          </div>
          </div>
        </div>`,
      )
    }
    this.updateView()
  }

  public getHtml() {
    return this.html
  }

  private clickHandler(event: JQuery.ClickEvent) {
    if (
      event.target.dataset.type !== 'r-handle'
      && event.target.dataset.type !== 'value'
    ) {
      let newValue: number = 1
      if (this.data.widthOfInterval) {
        newValue = this.data.widthOfInterval - event.offsetX
      }
      event.data.handler(newValue)
    }
  }

  public addClickHandler(handler: (value: number) => void) {
    this.html
      .find('[data-type="body"]')
      .on('click', { handler }, this.clickHandler.bind(this))
  }

  isAllowedForMousemoveHandler(setRight: number) {
    return (
      setRight >= 0
      && this.data.widthOfInterval
      && setRight <= this.data.widthOfInterval
    )
  }

  private mousemoveHandler(event: JQuery.MouseMoveEvent) {
    const delta = event.pageX - event.data.coords.left
    // eslint-disable-next-line no-param-reassign
    event.data.setRight = event.data.rightValue - delta
    if (this.isAllowedForMousemoveHandler(event.data.setRight)) {
      event.data.handler(event.data.setRight)
    }
  }

  private destroyMouseMoveHandler() {
    $(document).off('mousemove')
    return this
  }

  mouseDownHandler(event: JQuery.MouseDownEvent) {
    const handle = event.target
    const parent = $(handle.closest('[data-type="interval"]'))
    const coords = handle.getBoundingClientRect()
    const rightValue = parseInt($(parent).css('right'), 10)
    const setRight: number = this.data.currentPosition
    $(document).on(
      'mousemove',
      {
        setRight,
        coords,
        rightValue,
        handler: event.data.handler,
      },
      this.mousemoveHandler.bind(this),
    )
    $(document).on('mouseup', this.destroyMouseMoveHandler)
  }

  addMousedownHandler(handler: (value: number) => void) {
    this.html
      .find('[data-type="r-handle"]')
      .on('mousedown', { handler }, this.mouseDownHandler.bind(this))
  }
}
