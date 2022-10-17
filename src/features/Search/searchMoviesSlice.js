import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { resetFavouriteError } from '../MovieGrid/favouriteMoviesSlice';
import { resetPopularError } from '../MovieGrid/popularMoviesSlice';
import { fetchData } from 'tools/utility'


export const searchForMovies = createAsyncThunk(
  'search/search',
  async ({ page = 1, query = '' }, thunkAPI) => {
    const data = await fetchData(`${process.env.REACT_APP_BASE_URL}/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&include_adult=false&query=${query}`, {
      method: 'GET',
      signal: thunkAPI.signal
    })

    return data
  }
)

const initialState = {
  searchPage: 1,
  searchMovies: null,
  searchLoading: false,
  searchError: null,
  searchHasMore: false,
  searchLoadingMore: false,
  searchLoadingMoreError: null,
}

export const searchMoviesSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    incrementSearchPage: (state, action) => {
      return {
        ...state,
        searchPage: state.searchPage + 1
      }
    },
    resetSearchError: (state, action) => {
      return {
        ...state,
        searchError: null
      }
    },
    resetSearchState: (state, action) => {
      return {
        ...initialState,
        searchPage: state.searchPage
      }
    },
    setSearchPage: (state, action) => {
      return {
        ...state,
        searchPage: action?.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchForMovies.pending, (state, action) => {
        return {
          ...state,
          searchLoading: !!(state.searchPage === 1),
          searchLoadingMore: !!(state.searchPage > 1),
          searchError: null,
          searchLoadingMoreError: null
        }
      })
      .addCase(searchForMovies.fulfilled, (state, action) => {
        const { page, total_pages, results = [] } = action?.payload
        const searchPrev = state.searchMovies || []
        const searchIds = searchPrev.map(movie => movie?.id)
        const searchReceived = results.filter(result => searchIds?.indexOf(result?.id) === -1)

        return {
          ...state,
          searchMovies: state.searchPage === 1 ? results : [...searchPrev, ...searchReceived],
          searchPage: page,
          searchHasMore: parseInt(total_pages, 10) > parseInt(page, 10),
          searchLoading: false,
          searchLoadingMore: false
        }
      })
      .addCase(searchForMovies.rejected, (state, action) => {
        const { message = null } = action?.error

        return {
          ...state,
          searchError: state.searchPage === 1 ? message : null,
          searchLoadingMoreError: state.searchPage > 1 ? message : null,
          searchLoading: false,
          searchLoadingMore: false
        }
      })
  },
})


export const { incrementSearchPage, resetSearchError, resetSearchState, setSearchPage } = searchMoviesSlice.actions


export const resetErrors = (...args) => (dispatch) => {
  dispatch(resetFavouriteError())
  dispatch(resetPopularError())
  dispatch(resetSearchError())
}


export default searchMoviesSlice.reducer


