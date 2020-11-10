export default class Tooltip {
  tooltip: boolean

  constructor(tooltip: boolean) {
    this.tooltip = tooltip
  }

  getTooltip(value: number) {
    return this.tooltip
      ? `<div data-type="value" class="range-slider__tooltip">${value}</div>`
      : ''
  }
}
