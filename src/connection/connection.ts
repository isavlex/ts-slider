$('.js-box').tsSlider({
  minValue: 10,
  scale: true,
  stepsOfScale: 5,
});
$('.js-box2').tsSlider({
  currentValue: [15, 80],
  range: true,
  minValue: 10,
  tooltip: true,
  scale: true,
  stepsOfScale: [15, 30, 50, 70, 100],
});
