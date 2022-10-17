
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'
import './Modal.scss';

const Modal = ({ open, children, style, onClose, className, backdropStyle, ...props }) => {
  const handleClose = (e) => {
    e.preventDefault()

    if (onClose) {
      onClose(e)
    }
  }

  const modal = (
    <>
      <div className='modal__backdrop' style={backdropStyle} />
      <div
        className={`modal ${className}`}
        aria-modal
        aria-label='Modal Details'
        role='dialog'
        style={style}
        {...props}
      >
        {children}

        {onClose &&
          <button type='button' onClick={handleClose} className='modal__close'>
            &#x2715;
          </button>
        }
      </div>
    </>
  )

  return open ? createPortal(modal, document.body) : null
};

Modal.defaultProps = {
  onClose: () => { },
  style: {},
  className: '',
  backdropStyle: {},
  children: undefined
}

Modal.propTypes = {
  onClose: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  backdropStyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

export default Modal
