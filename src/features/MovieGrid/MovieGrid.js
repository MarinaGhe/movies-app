import { Fragment, useRef, useCallback, memo } from 'react'
import { useDispatch } from 'react-redux'
import { ABORTED_ERROR } from 'tools/constants'
import { resetErrors } from '../Search/searchMoviesSlice'
import PropTypes from 'prop-types'
import Modal from 'components/Modal/Modal'
import Grid from 'components/Grid/Grid'
import Card from 'components/Card/Card'
import CardSkeleton from 'components/CardSkeleton/CardSkeleton'
import Preloader from 'components/Preloader/Preloader'
import './MovieGrid.scss'

const MovieGrid = ({
  action,
  data,
  loading,
  error,
  page,
  loadingMore,
  hasMore,
  loadingMoreError,
  onLoadMore
}) => {
  const dispatch = useDispatch()
  const isModalOpen = error && error?.toLowerCase().indexOf(ABORTED_ERROR) === -1

  const handleModalClose = () => {
    dispatch(resetErrors())
  }

  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if (loading || loadingMore) return

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      let timer = null

      if (entries[0].isIntersecting && hasMore) {
        if (!onLoadMore || loadingMoreError) return
        if (timer) clearTimeout(timer)

        timer = setTimeout(onLoadMore, 1000)
      }
    }, { rootMargin: '0px 0px 100px 0px' })

    if (node) {
      observer.current.observe(node)
    }
  }, [onLoadMore, loading, loadingMore, loadingMoreError, hasMore])

  return (
    <div className='grid-wrapper'>
      {!loading && data?.length === 0 &&
        <div className='centered-text'>Wow, such empty</div>
      }

      <Grid>
        {loading && Array(8).fill('').map((item, index) => (
          <Fragment key={crypto.randomUUID()}>
            <CardSkeleton />
          </Fragment>
        ))}

        {data?.length > 0 && data?.map((movie, index) => (
          <Fragment key={movie.id}>
            {index === data?.length - 1 ? (
              <Card ref={lastElementRef} action={action} cardData={movie} />
            ) : (
              <Card action={action} cardData={movie} />
            )}
          </Fragment>
        ))}
      </Grid>

      {loadingMoreError &&
        <div className='centered-text centered-text--spaced text--red'>
          {loadingMoreError}
        </div>
      }

      {loadingMore &&
        <div className='centered-text centered-text--spaced'>
          <Preloader />
        </div>
      }

      <Modal open={isModalOpen} onClose={handleModalClose} className='modal__error'>
        <div className='modal__error--message text--red'>
          {error}
        </div>
      </Modal>
    </div>
  )
}

MovieGrid.defaultProps = {
  page: 1,
  data: null,
  loading: false,
  error: null,
  loadingMore: false,
  loadingMoreError: null,
  onLoadMore: () => { }
}

MovieGrid.propTypes = {
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
  loading: PropTypes.bool,
  error: PropTypes.string,
  loadingMore: PropTypes.bool,
  loadingMoreError: PropTypes.string,
  onLoadMore: PropTypes.func
}

export default memo(MovieGrid)
