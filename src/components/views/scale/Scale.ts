export default class Scale {
  options: TsSliderOptions

  constructor(options: TsSliderOptions) {
    this.options = options
  }

  private getPosition(num: number) {
    return (this.options.selector.offsetWidth * num) / this.options.maxValue
  }

  private getSteps() {
    let html = ''
    if (this.options.stepsOfScale > 10) {
      throw new Error('"stepsOfScale" should be less than 11')
    }
    if (typeof this.options.stepsOfScale === 'number') {
      const step = Math.floor(this.options.maxValue / this.options.stepsOfScale)
      for (let i = 0; i <= this.options.stepsOfScale; i += 1) {
        let valueOfStep
        if (i === 0) {
          valueOfStep = this.options.minValue
          if ((this.options.minValue + 4) >= step) {
            i += 1
          }
        } else if (i !== this.options.stepsOfScale) {
          valueOfStep = i * step
        } else {
          valueOfStep = this.options.maxValue
        }
        html += `<div data-type="scale" style="left: ${this.getPosition(valueOfStep)}px" class="range-slider__step">${
          valueOfStep
        }</div>`
      }
    } else {
      this.options.stepsOfScale.forEach((step: number) => {
        if (step < this.options.minValue || step > this.options.maxValue) return
        html += `<div data-type="scale" style="left: ${this.getPosition(step)}px" class="range-slider__step">${
          step
        }</div>`
      })
    }
    return html
  }

  getScale() {
    return this.options.scale
      ? `<div class="range-slider__scale">
          ${this.getSteps()}  
        </div>`
      : ''
  }
}
