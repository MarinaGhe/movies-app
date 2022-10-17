import './GoToBottom.scss';

const GoToBottom = () => {
  const handleScrollToBottom = (e) => {
    e.stopPropagation()
    window.scrollTo(0, document.body?.scrollHeight)
  }

  return (
    <button
      type='button'
      title="Go to bottom"
      onClick={handleScrollToBottom}
      className='scroll-bottom'
    >
      <span className='scroll-bottom__arrow'>&lsaquo;</span>
    </button>
  )
}

export default GoToBottom
