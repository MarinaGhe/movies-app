import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularMovies, incrementPopularPage } from 'features/MovieGrid/popularMoviesSlice'
import { fetchFavouriteMovies, incrementFavouritePage } from 'features/MovieGrid/favouriteMoviesSlice'
import { searchForMovies, incrementSearchPage, resetSearchState, setSearchPage } from 'features/Search/searchMoviesSlice'
import { ADD_FAVOURITE, REMOVE_FAVOURITE, SEARCH_DEBOUNCE_TIMER, LONGEST_MOVIE_TITLE_LENGTH } from 'tools/constants'
import { useDebounce } from 'hooks/useDebounce'
import GoToBottom from 'components/GoToBottom/GoToBottom'
import CustomButton from 'components/CustomButton/CustomButton'
import Tab from 'components/Tabs/Tab'
import Tabs from 'components/Tabs/Tabs'
import MovieGrid from 'features/MovieGrid/MovieGrid'
import BackToTop from 'components/BackToTop/BackToTop'
import Search from 'features/Search/Search'
import './Main.scss'


const Main = () => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [currentTab, setCurrentTab] = useState('popular')
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_TIMER)?.trim()
  const popularData = useSelector(state => state.popular)
  const favouriteData = useSelector(state => state.favourite)
  const searchData = useSelector(state => state.search)
  const hasSearched = query?.length > 0

  const {
    popularPage,
    popularMovies,
    popularLoading,
    popularError,
    popularHasMore,
    popularLoadingMore,
    popularLoadingMoreError
  } = popularData
  const {
    favouritePage,
    favouriteMovies,
    favouriteLoading,
    favouriteError,
    favouriteHasMore,
    favouriteLoadingMore,
    favouriteLoadingMoreError
  } = favouriteData
  const {
    searchPage,
    searchMovies,
    searchLoading,
    searchError,
    searchHasMore,
    searchLoadingMore,
    searchLoadingMoreError,
  } = searchData

  useEffect(() => {
    const loadPopular = dispatch(fetchPopularMovies(popularPage))
    return () => {
      loadPopular.abort()
    }
  }, [dispatch, popularPage])

  useEffect(() => {
    const loadFavourite = dispatch(fetchFavouriteMovies(favouritePage))
    return () => {
      loadFavourite.abort()
    }
  }, [dispatch, favouritePage])

  useEffect(() => {
    let loadSearch = null
    if (debouncedQuery.length > 0 && currentTab !== 'favourite') {
      loadSearch = dispatch(searchForMovies({ page: searchPage, query: debouncedQuery }))
    }
    return () => {
      loadSearch && loadSearch.abort()
    }
  }, [dispatch, currentTab, searchPage, debouncedQuery])

  const handleTabChange = (value) => {
    setCurrentTab(value)
  }

  const handleInputChange = (e) => {
    const value = e.target?.value.toLowerCase()
    if (value.length > LONGEST_MOVIE_TITLE_LENGTH) return
    setQuery(value)
    if (searchPage !== 1) dispatch(setSearchPage(1))
  }

  const handleInputClear = () => {
    setQuery('')
    if (searchMovies) dispatch(resetSearchState())
  }

  const handlePopularLoadMore = () => {
    if (hasSearched && searchHasMore) dispatch(incrementSearchPage())
    if (!hasSearched && popularHasMore) dispatch(incrementPopularPage())
  }

  const handleFavouriteLoadMore = () => {
    if (hasSearched && searchHasMore) dispatch(incrementSearchPage())
    if (!hasSearched && favouriteHasMore) dispatch(incrementFavouritePage())
  }

  const handleReloadList = (e) => {
    e.stopPropagation()
    if (currentTab === 'popular') dispatch(fetchPopularMovies())
    if (currentTab === 'favourite') dispatch(fetchFavouriteMovies())
  }

  // maybe I was blind but I didn't find an api endpoint that can search through favourites
  const filteredFavourite = useMemo(
    () => [...(favouriteMovies || [])]?.filter((movie, index) => movie?.title.toLowerCase().indexOf(query.toLowerCase()) !== -1),
    [favouriteMovies, query]
  )


  return (
    <div className='main'>
      <div className='main__scroll'>
        <GoToBottom />

        <CustomButton
          title="Reload list"
          className='main__reload'
          onClick={handleReloadList}
        >
          &#8635;
        </CustomButton>
      </div>

      <Search
        value={query}
        loading={searchLoading}
        placeholder='Search Movies...'
        label='Search this movie list'
        className='main__search'
        aria-label='This movie list'
        onChange={handleInputChange}
        onClear={handleInputClear}
      />

      <Tabs className='main__tabs' onChange={handleTabChange}>
        <Tab title='Popular Movies' value='popular'>
          <MovieGrid
            action={ADD_FAVOURITE}
            data={
              hasSearched && searchMovies
                ? searchMovies
                : popularMovies
            }
            loading={
              hasSearched && searchLoading
                ? searchLoading
                : popularLoading
            }
            error={
              hasSearched && searchError
                ? searchError
                : popularError
            }
            hasMore={
              hasSearched && searchHasMore
                ? searchHasMore
                : popularHasMore
            }
            loadingMore={
              hasSearched && searchLoadingMore
                ? searchLoadingMore
                : popularLoadingMore
            }
            loadingMoreError={
              hasSearched && searchLoadingMoreError
                ? searchLoadingMoreError
                : popularLoadingMoreError
            }
            onLoadMore={handlePopularLoadMore}
          />
        </Tab>

        <Tab title='Favourite Movies' value='favourite'>
          <MovieGrid
            action={REMOVE_FAVOURITE}
            data={hasSearched ? filteredFavourite : favouriteMovies}
            loading={favouriteLoading}
            error={favouriteError}
            hasMore={favouriteHasMore}
            loadingMore={favouriteLoadingMore}
            loadingMoreError={favouriteLoadingMoreError}
            onLoadMore={handleFavouriteLoadMore}
          />
        </Tab>
      </Tabs>


      <BackToTop />
    </div>
  )
}

export default Main
