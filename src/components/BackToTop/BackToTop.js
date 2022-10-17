import { useEffect, useState } from 'react';
import './BackToTop.scss';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed-wrapper">
      {isVisible && (
        <button
          type='button'
          title="Back to top"
          onClick={handleScrollToTop}
          className='fixed-wrapper__button'
        >
          &uarr;
        </button>
      )}
    </div>
  )
}

export default BackToTop
