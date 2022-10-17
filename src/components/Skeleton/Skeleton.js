import PropTypes from 'prop-types'
import './Skeleton.scss'

const Skeleton = ({ children, variant, width, height, className, ...props }) => {
  return (
    <div
      className={`skeleton ${variant && variant === 'circular' ? 'skeleton--circular' : ''} ${className}`}
      style={{ width, height }}
      {...props}
    >
      {children}
    </div>
  )
}

Skeleton.defaultProps = {
  children: undefined,
  variant: 'rectangular',
  width: '',
  height: '',
  className: ''
}

Skeleton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  variant: PropTypes.oneOf(['circular', 'rectangular']),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  className: PropTypes.string
}

export default Skeleton