import { Idata } from '../models/Models'
import FieldValue from './fieldValue/FieldValue'
import Interval from './interval/Interval'
import Tooltip from './tooltip/Tooltip'
import Scale from './scale/Scale'

export default class SliderView {
  options: TsSliderOptions

  widthOfInterval: number

  data: Idata

  html: JQuery = $()

  constructor(options: TsSliderOptions, data: Idata) {
    this.options = options
    this.widthOfInterval = options.selector.offsetWidth
    this.data = data
    this.init()
  }

  get getData() {
    return this.data
  }

  public updateView() {
    this.html.find('[data-type="interval"]').css({
      left: `${this.data.currentPositionLeft}px`,
      right: `${this.data.currentPositionRight}px`,
    })
    this.html.find('[data-type="left-value"]').text(this.data.currentValueLeft)
    this.html.find('[data-type="right-value"]').text(this.data.currentValueRight)
    this.html.find('[data-tooltip="left"]').text(this.data.currentValueLeft)
    this.html.find('[data-tooltip="right"]').text(this.data.currentValueRight)
  }

  private init() {
    const tooltip = new Tooltip(this.options.tooltip)
    const interval = new Interval(
      tooltip.getTooltip(this.data.currentValueLeft, 'left'),
      tooltip.getTooltip(this.data.currentValueRight, 'right'),
      this.options.range,
    )
    const fieldValue = new FieldValue(this.options.tooltip, this.options.range)
    const scale = new Scale(this.options)
    this.html = $(
      `<div class="range-slider">
        ${fieldValue.getField(this.data.currentValueRight, this.data.currentValueLeft, this.options.separator)}
        ${interval.getInterval()}
        ${scale.getScale()}
      </div>`,
    )
    this.updateView()
  }

  public getHtml() {
    return this.html
  }

  // eslint-disable-next-line class-methods-use-this
  private isAllowedForClickHandler(event: JQuery.ClickEvent) {
    return (
      event.target.dataset.type !== 'right-handle'
      && event.target.dataset.type !== 'left-handle'
      && event.target.dataset.type !== 'value'
      && event.target.dataset.type !== 'scale'
    )
  }

  // eslint-disable-next-line class-methods-use-this
  private getPosition(event: JQuery.ClickEvent) {
    const coords = event.currentTarget.getBoundingClientRect()
    const position = event.pageX - coords.left
    return position
  }

  private isLeftOrRightHandle(event: JQuery.ClickEvent, mode?: string) {
    const position = mode ? event.target.offsetLeft : this.getPosition(event)
    const rightHandle = this.widthOfInterval - this.data.currentPositionRight
    const leftHandle = this.data.currentPositionLeft
    const middleOfHandles = (rightHandle - leftHandle) / 2
    const defineHandle = position > leftHandle + middleOfHandles ? 'right' : 'left'
    return defineHandle
  }

  private clickHandler(event: JQuery.ClickEvent) {
    const position = this.getPosition(event)
    let newValue = this.isLeftOrRightHandle(event) === 'left'
      ? position
      : this.widthOfInterval - position
    if (this.isAllowedForClickHandler(event) && !this.options.range) {
      event.data.handler(newValue, 'right')
    }
    if (this.isAllowedForClickHandler(event) && this.options.range) {
      event.data.handler(newValue, this.isLeftOrRightHandle(event))
    }
    if (event.target.dataset.type === 'scale' && !this.options.range) {
      newValue = this.widthOfInterval - event.target.offsetLeft
      event.data.handler(newValue, 'right')
    }
    if (event.target.dataset.type === 'scale' && this.options.range) {
      newValue = this.isLeftOrRightHandle(event, 'scale') === 'left'
        ? event.target.offsetLeft
        : this.widthOfInterval - event.target.offsetLeft
      event.data.handler(newValue, this.isLeftOrRightHandle(event, 'scale'))
    }
  }

  addClickHandler(handler: (value: number, handle: string) => void) {
    this.html.find('[data-type="body"]').on('click', { handler }, this.clickHandler.bind(this))
    this.html.find('[data-type="scale"]').on('click', { handler }, this.clickHandler.bind(this))
  }

  private isAllowedForMousemoveHandler(set: number, handle?: string) {
    const result = handle === 'left'
      ? set >= 0
        && set <= this.widthOfInterval
        && set < this.widthOfInterval - this.data.currentPositionRight
      : set >= 0
        && set <= this.widthOfInterval
        && this.widthOfInterval - set > this.data.currentPositionLeft
    return result
  }

  private destroyMouseMoveHandler() {
    $(document).off('mousemove')
    return this
  }

  mousemoveLeftHandler(event: JQuery.MouseMoveEvent) {
    const delta = event.pageX - event.data.coords.left
    // eslint-disable-next-line no-param-reassign
    event.data.setLeft = event.data.leftValue + delta
    if (this.isAllowedForMousemoveHandler(event.data.setLeft, 'left')) {
      event.data.handler(event.data.setLeft, 'left')
    }
  }

  mouseDownLeftHandler(event: JQuery.MouseDownEvent) {
    const handle = event.target
    const parent = $(handle.closest('[data-type="interval"]'))
    const coords = handle.getBoundingClientRect()
    const leftValue = parseInt($(parent).css('left'), 10)
    const setLeft: number = this.data.currentPositionLeft
    $(document).on(
      'mousemove',
      {
        setLeft,
        coords,
        leftValue,
        handler: event.data.handler,
      },
      this.mousemoveLeftHandler.bind(this),
    )
    $(document).on('mouseup', this.destroyMouseMoveHandler)
  }

  mousemoveRightHandler(event: JQuery.MouseMoveEvent) {
    const delta = event.pageX - event.data.coords.left
    // eslint-disable-next-line no-param-reassign
    event.data.setRight = event.data.rightValue - delta
    if (this.isAllowedForMousemoveHandler(event.data.setRight, 'right')) {
      event.data.handler(event.data.setRight, 'right')
    }
  }

  mouseDownRightHandler(event: JQuery.MouseDownEvent) {
    const handle = event.target
    const parent = $(handle.closest('[data-type="interval"]'))
    const coords = handle.getBoundingClientRect()
    const rightValue = parseInt($(parent).css('right'), 10)
    const setRight: number = this.data.currentPositionRight
    $(document).on(
      'mousemove',
      {
        setRight,
        coords,
        rightValue,
        handler: event.data.handler,
      },
      this.mousemoveRightHandler.bind(this),
    )
    $(document).on('mouseup', this.destroyMouseMoveHandler)
  }

  addMouseDownHandler(handler: (value: number, handle: string) => void) {
    this.html.find('[data-type="right-handle"]').on('mousedown', { handler }, this.mouseDownRightHandler.bind(this))
    this.html.find('[data-type="left-handle"]').on('mousedown', { handler }, this.mouseDownLeftHandler.bind(this))
  }
}
