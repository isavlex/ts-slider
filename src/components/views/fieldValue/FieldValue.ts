export default class FieldValue {
  tooltip: boolean

  range: boolean | undefined

  constructor(tooltip: boolean, range?: boolean) {
    this.tooltip = tooltip
    this.range = range
  }

  getField(rightValue: number, leftValue: number, separator: string = '-') {
    if (separator.length > 1 || typeof separator !== 'string') {
      throw new Error('Separator must be at most one character and must also be of type "string"')
    }
    const values = this.range
      ? `<span data-type="left-value" class="range-slider__value">${leftValue}</span>
          ${separator}
        <span data-type="right-value" class="range-slider__value">${rightValue}</span>`
      : `<span data-type="right-value" class="range-slider__value">${rightValue}</span>`
    return !this.tooltip ? `<div class="range-slider__value">${values}</div>` : ''
  }
}
