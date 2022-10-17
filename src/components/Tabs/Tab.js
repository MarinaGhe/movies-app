import PropTypes from 'prop-types'

const Tab = ({ children, value, title, ...props }) => {
  return (
    <div className='tab__panel'>
      {children}
    </div>
  )
}

Tab.defaultProps = {
  children: undefined,
  value: 0,
  title: 'Label'
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  value: PropTypes.any,
  title: PropTypes.string
}

export default Tab