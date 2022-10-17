import PropTypes from 'prop-types'
import './CustomButton.scss';

const CustomButton = ({ className, onClick, children, ...props }) => {
  const handleClick = (e) => {
    if (!onClick) return

    onClick(e)
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`${className} custom-button`}
      {...props}
    >
      {children}
    </button>
  )
}

CustomButton.defaultProps = {
  className: '',
  children: undefined,
  onClick: () => { }
}

CustomButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

export default CustomButton
