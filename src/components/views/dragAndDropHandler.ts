export function dragAndDropHandler(e: any, handler: any, widthOfInterval: number) {
  const handle = e.target
  const parent = $(handle.closest('[data-type="interval"]'))
  const coords = handle.getBoundingClientRect()
  const rightValue = parseInt($(parent).css('right'))
  $(document).on('mousemove', (event: any) => {
    const delta = event.pageX - coords.left
    const setRight = rightValue - delta
    if (setRight >= 0 && setRight <= widthOfInterval) {
      handler(setRight)
    }
  })

  $(document).on('mouseup', () => {
    $(document).off('mousemove')
  })
}
