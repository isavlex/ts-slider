export default class Interval {
  tooltipLeft: string

  tooltipRight: string

  range?: boolean

  constructor(tooltipLeft: string, tooltipRight: string, range?: boolean) {
    this.tooltipLeft = tooltipLeft
    this.tooltipRight = tooltipRight
    this.range = range
  }

  getInterval() {
    const lHandle = this.range
      ? `<div data-type="left-handle"
          class="range-slider__handle 
          range-slider__handle--left">
          ${this.tooltipLeft}
        </div>`
      : ''
    return `<div data-type="body" class="range-slider__body">
              <div data-type="interval" class="range-slider__interval">
                ${lHandle}
                <div data-type="right-handle"
                  class="range-slider__handle 
                  range-slider__handle--right">
                    ${this.tooltipRight}
                  </div>
                </div>
              </div>`
  }
}
