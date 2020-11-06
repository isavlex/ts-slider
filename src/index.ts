import './scss/index.scss'
import {Emitter} from './components/core/emitter'
import {ListPresenter} from './components/core/presenters'

export const customEvents = new Emitter()


const slider = new ListPresenter({
  selector: '.box',
  currentValue: 20,
  minValue: 10,
  maxValue: 100,
  tooltip: false
})

const slider2 = new ListPresenter({
  selector: '.box2',
  currentValue: 20,
  minValue: 10,
  maxValue: 100,
  tooltip: false
})


slider.getView()
slider2.getView()
