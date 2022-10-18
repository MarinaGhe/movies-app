import { forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { truncate, formatDate } from 'tools/utility'
import { ADD_FAVOURITE, REMOVE_FAVOURITE, IMAGE_INTRINSIC_HEIGHT, IMAGE_INTRINSIC_WIDTH } from 'tools/constants'
import { addToFavourites } from 'features/MovieGrid/popularMoviesSlice'
import { removeFromFavourites, addMovieToList } from 'features/MovieGrid/favouriteMoviesSlice'
import Modal from 'components/Modal/Modal'
import PropTypes from 'prop-types'
import imageFallback from 'assets/images/no_image.svg'
import './Card.scss'

const Card = forwardRef((props, ref) => {
  const { cardData, action, className } = props
  const { id, title, backdrop_path, poster_path, release_date } = cardData
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [imageSrc, setImageSrc] = useState(`${process.env.REACT_APP_IMAGE_BASE_URL}/${backdrop_path || poster_path}`)
  const dispatch = useDispatch()
  const isAdd = action === ADD_FAVOURITE
  const isRemove = action === REMOVE_FAVOURITE

  if (error && isRemove) {
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const handleOnError = () => {
    setImageSrc(imageFallback)
  }

  const addCard = async () => {
    if (!id) return
    const dataToSend = JSON.stringify({
      'media_type': 'movie',
      'media_id': id,
      'favorite': true
    })

    setLoading(true)
    dispatch(addToFavourites({ id, dataToSend }))
      .then(response => {
        if (response?.payload?.success) {
          dispatch(addMovieToList({ data: cardData }))
          setSuccess(true)
        }
        if (response?.error?.message) {
          setError(response.error.message)
        }
        setTimeout(() => setLoading(false), 500)
      })
  }

  const removeCard = async () => {
    if (!id) return
    const dataToSend = JSON.stringify({
      'media_type': 'movie',
      'media_id': id,
      'favorite': false
    })

    setLoading(true)
    dispatch(removeFromFavourites({ id, dataToSend }))
      .then(response => {
        if (response?.error?.message) {
          setError(response.error.message)
        }
        setLoading(false)
      })
  }

  const handleActionClick = () => {
    if (!action) return
    if (isAdd) addCard()
    if (isRemove) removeCard()
  }

  const handleModalClose = () => {
    setError(null)
  }

  let customClass = ''
  switch (true) {
    case loading && isAdd && !success:
      customClass = 'card--loading__add'
      break;
    case loading && isAdd && success:
      customClass = 'card--loading__add card--loading__done'
      break;
    case loading && isRemove:
      customClass = 'card--loading__remove'
      break;
    default:
      customClass = ''
  }

  return (
    <div ref={ref} className={`card card--fade ${customClass} ${className}`}>
      <div className='card__media'>
        {action === REMOVE_FAVOURITE &&
          <div className={`card__error ${error ? 'card__error--visible' : ''}`}>{error}</div>
        }
        <img
          width={IMAGE_INTRINSIC_WIDTH}
          height={IMAGE_INTRINSIC_HEIGHT}
          alt='Movie poster'
          loading="lazy"
          className='card__media--image'
          src={imageSrc || imageFallback}
          onError={handleOnError}
        />
      </div>

      <div className='card__details'>
        {title &&
          <h1 title={title} className='card__title'>{truncate(title, 50)}</h1>
        }

        {release_date &&
          <div className='card__date'>Release date: {`${formatDate(release_date)}`}</div>
        }

        {action &&
          <button type='button' className='card__action' onClick={handleActionClick}>
            {action === ADD_FAVOURITE && 'Add to favourites'}
            {action === REMOVE_FAVOURITE && 'Delete from favourites'}
          </button>
        }
      </div>

      <Modal open={error && isAdd} onClose={handleModalClose} className='modal__error'>
        <div className='modal__error--message text--red'>
          {error}
        </div>
      </Modal>

    </div>
  )
})

Card.defaultProps = {
  cardData: {},
  action: null,
  className: ''
}

Card.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      backdrop_path: PropTypes.string,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.number,
      original_language: PropTypes.string,
      original_title: PropTypes.string,
      overview: PropTypes.string,
      popularity: PropTypes.number,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
      video: PropTypes.any,
      vote_vaerage: PropTypes.number,
      vote_count: PropTypes.number
    })),
  action: PropTypes.oneOf([REMOVE_FAVOURITE, ADD_FAVOURITE]),
  className: PropTypes.string
}

export default Card