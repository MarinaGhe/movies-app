import { useState } from 'react'
import { ENTER_KEY } from './../../tools/constants'
import PropTypes from 'prop-types'
import './Tabs.scss'

const Tabs = ({ children, onChange, ...props }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const childrenList = Array.isArray(children) ? children : [children]

  const handleTabChange = (index, value) => {
    setSelectedTab(index)

    if (onChange) {
      if (value) {
        onChange(value)
      } else {
        onChange(index)
      }
    }
  }

  const handleKeyDown = (e, index) => {
    const key = e.key

    if (key === ENTER_KEY) {
      setSelectedTab(index)
    }
  }

  return (
    <div className='tab' {...props}>
      <div className='tab__list' role='tablist' aria-label='basic-tabs'>
        {childrenList.map((child, index) => (
          <button
            role='tab'
            tabIndex={0}
            onClick={() => handleTabChange(index, child?.props?.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`tab__list--item ${selectedTab === index ? 'tab__list--active' : ''}`}
            key={crypto.randomUUID()}
          >
            {child?.props?.title}
          </button>
        ))}
      </div>

      {childrenList[selectedTab]}
    </div>
  )
}

Tabs.defaultProps = {
  children: undefined,
  onChange: () => { }
}

Tabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onChange: PropTypes.func,
}

export default Tabs