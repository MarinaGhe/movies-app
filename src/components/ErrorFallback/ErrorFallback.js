import PropTypes from 'prop-types'
import './ErrorFallback.scss'

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert" className='error'>
      <p className='error__title'>Something went wrong:</p>
      <p className='error__message'>{error}</p>
      <button className='error__action' onClick={() => window.location.reload()}>Try again</button>
    </div>
  )
}

ErrorFallback.defaulProps = {
  error: null
}

ErrorFallback.propTypes = {
  error: PropTypes.string
}

export default ErrorFallback