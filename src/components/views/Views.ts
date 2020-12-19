import { Idata } from '../models/Models'
import FieldValue from './fieldValue/FieldValue'
import Interval from './interval/Interval'
import Tooltip from './tooltip/Tooltip'
import Scale from './scale/Scale'

export default class SliderView {
  options: TsSliderOptions

  widthOfInterval: number

  heightOfInterval: number

  data: Idata

  html: JQuery = $()

  constructor(options: TsSliderOptions, data: Idata) {
    this.options = options
    this.widthOfInterval = options.selector.offsetWidth
    this.heightOfInterval = options.selector.offsetHeight
    this.data = data
    this.init()
  }

  get getData() {
    return this.data
  }

  public updateView() {
    if (this.options.orientation !== 'vertical') {
      this.html.find('[data-type="interval"]').css({
        left: `${this.data.currentPositionLeft}px`,
        right: `${this.data.currentPositionRight}px`,
      })
    } else {
      this.html.find('[data-type="interval"]').css({
        top: `${this.data.currentPositionLeft}px`,
        bottom: `${this.data.currentPositionRight}px`,
      })
    }
    this.html.find('[data-type="left-value"]').text(this.data.currentValueLeft)
    this.html.find('[data-type="right-value"]').text(this.data.currentValueRight)
    this.html.find('[data-tooltip="left"]').text(this.data.currentValueLeft)
    this.html.find('[data-tooltip="right"]').text(this.data.currentValueRight)
  }

  private init() {
    const tooltip = new Tooltip(this.options.tooltip, this.options.orientation)
    const interval = new Interval(
      tooltip.getTooltip(this.data.currentValueLeft, 'left'),
      tooltip.getTooltip(this.data.currentValueRight, 'right'),
      this.options.range,
      this.options.orientation,
    )
    const fieldValue = new FieldValue(this.options.tooltip, this.options.range)
    const scale = new Scale(this.options)
    const verticalMode = this.options.orientation === 'vertical' ? 'range-slider--vertical' : ''
    this.html = $(
      `<div class="range-slider ${verticalMode}">
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
    let position
    if (this.options.orientation !== 'vertical') {
      position = event.pageX - coords.left
    } else {
      position = event.clientY - coords.top
    }
    return position
  }

  private isLeftOrRightHandle(event: JQuery.ClickEvent, mode?: string) {
    const leftOrTopPosition = this.options.orientation !== 'vertical'
      ? event.target.offsetLeft
      : event.target.offsetTop
    const position = mode ? leftOrTopPosition : this.getPosition(event)
    const rightHandle = this.options.orientation !== 'vertical'
      ? this.widthOfInterval - this.data.currentPositionRight
      : this.heightOfInterval - this.data.currentPositionRight
    const leftHandle = this.data.currentPositionLeft
    const middleOfHandles = (rightHandle - leftHandle) / 2
    const defineHandle = position > leftHandle + middleOfHandles ? 'right' : 'left'
    return defineHandle
  }

  private clickHandlerInterval(event: JQuery.ClickEvent) {
    const position = this.getPosition(event)
    const newValue = this.isLeftOrRightHandle(event) === 'left'
      ? position
      : this.widthOfInterval - position
    if (this.isAllowedForClickHandler(event) && !this.options.range) {
      event.data.handler(newValue, 'right')
    }
    if (this.isAllowedForClickHandler(event) && this.options.range) {
      event.data.handler(newValue, this.isLeftOrRightHandle(event))
    }
  }

  private clickHandlerScale(event: JQuery.ClickEvent) {
    let newValue
    if (!this.options.range) {
      newValue = this.options.orientation !== 'vertical'
        ? this.widthOfInterval - event.target.offsetLeft
        : this.heightOfInterval - event.target.offsetTop
      event.data.handler(newValue, 'right')
    } else {
      const gorizontalOrVerticalLeft = this.options.orientation !== 'vertical'
        ? event.target.offsetLeft
        : event.target.offsetTop
      const gorizontalOrVerticalRight = this.options.orientation !== 'vertical'
        ? this.widthOfInterval - event.target.offsetLeft
        : this.heightOfInterval - event.target.offsetTop
      newValue = this.isLeftOrRightHandle(event, 'scale') === 'left'
        ? gorizontalOrVerticalLeft
        : gorizontalOrVerticalRight
      event.data.handler(newValue, this.isLeftOrRightHandle(event, 'scale'))
    }
  }

  addClickHandler(handler: (value: number, handle: string) => void) {
    this.html.find('[data-type="body"]').on('click', { handler }, this.clickHandlerInterval.bind(this))
    this.html.find('[data-type="scale"]').on('click', { handler }, this.clickHandlerScale.bind(this))
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
    let delta: number
    let setLeft: number
    if (this.options.orientation !== 'vertical') {
      delta = event.pageX - event.data.coords.left
      setLeft = event.data.leftValue + delta
    } else {
      delta = event.clientY - event.data.coords.top
      setLeft = event.data.topValue + delta
    }
    if (this.isAllowedForMousemoveHandler(setLeft, 'left')) {
      event.data.handler(setLeft, 'left')
    }
  }

  mouseDownLeftHandler(event: JQuery.MouseDownEvent) {
    const handle = event.target
    const parent = $(handle.closest('[data-type="interval"]'))
    const coords = handle.getBoundingClientRect()
    const leftValue = parseInt($(parent).css('left'), 10)
    const topValue = parseInt($(parent).css('top'), 10)
    $(document).on(
      'mousemove',
      {
        coords,
        leftValue,
        topValue,
        handler: event.data.handler,
      },
      this.mousemoveLeftHandler.bind(this),
    )
    $(document).on('mouseup', this.destroyMouseMoveHandler)
  }

  mousemoveRightHandler(event: JQuery.MouseMoveEvent) {
    let delta: number
    let setRight: number
    if (this.options.orientation !== 'vertical') {
      delta = event.pageX - event.data.coords.left
      setRight = event.data.rightValue - delta
    } else {
      delta = event.clientY - event.data.coords.bottom
      setRight = event.data.bottomValue - delta
    }
    if (this.isAllowedForMousemoveHandler(setRight, 'right')) {
      event.data.handler(setRight, 'right')
    }
  }

  mouseDownRightHandler(event: JQuery.MouseDownEvent) {
    const handle = event.target
    const parent = $(handle.closest('[data-type="interval"]'))
    const coords = handle.getBoundingClientRect()
    const rightValue = parseInt($(parent).css('right'), 10)
    const bottomValue = parseInt($(parent).css('bottom'), 10)
    $(document).on(
      'mousemove',
      {
        coords,
        rightValue,
        bottomValue,
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
