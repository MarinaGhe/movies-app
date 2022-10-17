import PropTypes from 'prop-types'
import './Grid.scss'

const Grid = ({ children, ...props }) => {
  return (
    <div className='grid' {...props}>{children}</div>
  )
}

export default Grid

Grid.defaultProps = {
  children: undefined
}

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}