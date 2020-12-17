export default class Tooltip {
  tooltip: boolean

  orientation: string | undefined

  constructor(tooltip: boolean, orientation?: string) {
    this.tooltip = tooltip
    this.orientation = orientation
  }

  getTooltip(value: number, position: string) {
    const mode = this.orientation === 'vertical' ? 'range-slider__tooltip--vertical' : ''
    return this.tooltip
      ? `<div data-tooltip="${position}" data-type="${position}-handle" class="range-slider__tooltip ${mode}">${value}</div>`
      : ''
  }
}
