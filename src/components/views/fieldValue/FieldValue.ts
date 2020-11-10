export default class FieldValue {
  tooltip: boolean

  constructor(tooltip: boolean) {
    this.tooltip = tooltip
  }

  getField(value: number) {
    return this.tooltip
      ? `<div class="range-slider__head">
          <h4 data-type="value" class="range-slider__value">${value}</h4>
        </div>`
      : ''
  }
}
