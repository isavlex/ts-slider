export default class Interval {
  tooltip: string

  constructor(tooltip: string) {
    this.tooltip = tooltip
  }

  getInterval() {
    return `<div data-type="body" class="range-slider__body">
              <div data-type="interval" class="range-slider__interval">
                <div data-type="r-handle"
                  class="range-slider__handle 
                  range-slider__handle--right">
                    ${this.tooltip}
                  </div>
                </div>
              </div>`
  }
}
