$('.js-box').tsSlider({
  minValue: 10,
  scale: true,
  stepsOfScale: 5,
});

$('.js-box2').tsSlider({
  currentValue: [15, 80],
  range: true,
  separator: '/',
  minValue: 10,
  tooltip: false,
  scale: true,
  stepsOfScale: [15, 30, 50, 70, 100],
});

$('.js-box3').tsSlider({
  currentValue: [15, 80],
  range: true,
  orientation: 'vertical',
  separator: '/',
  minValue: 10,
  tooltip: true,
  scale: true,
  stepsOfScale: [15, 30, 50, 70, 100],
});
