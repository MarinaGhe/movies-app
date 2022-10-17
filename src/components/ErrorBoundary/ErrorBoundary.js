import React from 'react'
import ErrorFallback from 'components/ErrorFallback/ErrorFallback';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <ErrorFallback error={this.state.error} />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary