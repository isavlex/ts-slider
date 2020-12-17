/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import '../../scss/index.scss'
import Emitter from '../core/Emitter'
import ListPresenter from '../core/Presenters'

// eslint-disable-next-line import/prefer-default-export
export const customEvents = new Emitter();

(function ($: JQueryStatic): void {
  $.fn.tsSlider = function (options?): JQuery {
    const settings: TsSliderOptions = $.extend(
      {
        currentValue: [100],
        minValue: 0,
        maxValue: 100,
        tooltip: false,
        scale: false,
        stepsOfScale: 4,
        range: false,
        orientation: 'horizontal',
        separator: '-',
      },
      options,
    )
    return this.each((index) => {
      settings.selector = this[index]
      const slider = new ListPresenter(settings)
      slider.getView()
    })
  }
}(jQuery));
