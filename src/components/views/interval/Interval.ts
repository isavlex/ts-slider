export default class Interval {
  tooltipLeft: string

  tooltipRight: string

  range?: boolean

  orientation?: string

  constructor(tooltipLeft: string, tooltipRight: string, range?: boolean, orientation?: string) {
    this.tooltipLeft = tooltipLeft
    this.tooltipRight = tooltipRight
    this.range = range
    this.orientation = orientation
  }

  getInterval() {
    const bodyVerticalMod = this.orientation === 'vertical' ? 'range-slider__body--vertical' : ''
    const intervalVerticalMod = this.orientation === 'vertical' ? 'range-slider__interval--vertical' : ''

    const leftOrTopHandle = this.orientation === 'vertical' ? 'range-slider__handle--top' : 'range-slider__handle--left'
    const rightOrBottomHandle = this.orientation === 'vertical' ? 'range-slider__handle--bottom' : 'range-slider__handle--right'

    const ltHandle = this.range
      ? `<div data-type="left-handle"
          class="range-slider__handle 
          ${leftOrTopHandle}">
          ${this.tooltipLeft}
        </div>`
      : ''
    return `<div data-type="body" class="range-slider__body ${bodyVerticalMod}">
              <div data-type="interval" class="range-slider__interval ${intervalVerticalMod}">
                ${ltHandle}
                <div data-type="right-handle"
                  class="range-slider__handle 
                  ${rightOrBottomHandle}">
                    ${this.tooltipRight}
                  </div>
                </div>
              </div>`
  }
}
