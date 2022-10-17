import PropTypes from 'prop-types'
import Preloader from 'components/Preloader/Preloader'
import './Search.scss'

const Search = ({ value, label, placeholder, loading, className, onChange, onClear, ...props }) => {

  const handleInputChange = (e) => {
    if (!onChange) return
    onChange(e)
  }

  const handleInputClear = (value) => {
    if (!onClear || !value) return
    onClear(value)
  }

  return (
    <form className={`${className} search`} role='search' onSubmit={(e) => e.preventDefault()} {...props}>
      <label className='search__label' htmlFor='search-input'>{label}</label>
      <input
        className='search__input'
        type='text' id='search-input'
        name='search'
        spellCheck='false'
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />

      <div className='search__icon'>
        {loading ? (
          <span><Preloader /></span>
        ) : (
          <span className='search__icon--magnifier'>&#128269;</span>
        )}
      </div>
      <button
        type='button'
        className={`search__clear ${value.length > 0 ? 'search__clear--visible' : ''}`}
        onClick={handleInputClear}>
        &#x2715;
      </button>
    </form>
  )
}

Search.defaultProps = {
  value: '',
  label: '',
  className: '',
  placeholder: '',
  loading: false,
  onChange: () => { },
  onClear: () => { }
}

Search.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
}


export default Search