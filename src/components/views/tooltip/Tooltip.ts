export default class Tooltip {
  tooltip: boolean

  constructor(tooltip: boolean) {
    this.tooltip = tooltip
  }

  getTooltip(value: number, position: string) {
    return this.tooltip
      ? `<div data-tooltip="${position}" data-type="${position}-handle" class="range-slider__tooltip">${value}</div>`
      : ''
  }
}
