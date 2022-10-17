import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from 'tools/utility'

export const fetchFavouriteMovies = createAsyncThunk(
  'favourite/fetchFavouriteMovies',
  async (page = 1, thunkAPI) => {
    const data = await fetchData(`${process.env.REACT_APP_BASE_URL}/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite/movies?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}&sort_by=created_at.desc&page=${page}`, {
      method: 'GET',
      signal: thunkAPI.signal,
    })

    return data
  }
)

export const removeFromFavourites = createAsyncThunk(
  'remove/removeFromFavourites',
  async ({ id, dataToSend }, thunkAPI) => {
    const data = await fetchData(`${process.env.REACT_APP_BASE_URL}/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`, {
      method: 'POST',
      body: dataToSend,
      signal: thunkAPI.signal
    })

    return { data, id }
  }
)

const initialState = {
  favouritePage: 1,
  favouriteMovies: null,
  favouriteLoading: false,
  favouriteError: null,
  favouriteHasMore: false,
  favouriteLoadingMore: false,
  favouriteLoadingMoreError: null,
}

export const favouriteMoviesSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    incrementFavouritePage: (state, action) => {
      return {
        ...state,
        favouritePage: state.favouritePage + 1
      }
    },
    resetFavouriteError: (state, action) => {
      return {
        ...state,
        favouriteError: null
      }
    },
    addMovieToList: (state, action) => {
      const { data } = action?.payload
      const favouriteMoviesPrev = [...(state.favouriteMovies || [])]
      const isAlreadyInList = favouriteMoviesPrev.some((o) => o?.id === data?.id)

      return {
        ...state,
        favouriteMovies: isAlreadyInList ? favouriteMoviesPrev : [data, ...favouriteMoviesPrev]
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouriteMovies.pending, (state) => {
        return {
          ...state,
          favouriteLoading: !!(state.favouritePage === 1),
          favouriteLoadingMore: !!(state.favouritePage > 1),
          favouriteError: null,
          favouriteLoadingMoreError: null,
          addFavouriteError: null
        }
      })
      .addCase(fetchFavouriteMovies.fulfilled, (state, action) => {
        const { page, total_pages, results = [] } = action?.payload
        const favouriteMoviesPrev = [...(state.favouriteMovies || [])]
        const favouriteMoviesIds = favouriteMoviesPrev.map(movie => movie?.id)
        const favouriteReceived = results.filter(result => favouriteMoviesIds?.indexOf(result?.id) === -1)

        return {
          ...state,
          favouriteMovies: state.favouritePage === 1 ? results : [...favouriteMoviesPrev, ...favouriteReceived],
          favouritePage: page,
          favouriteHasMore: parseInt(total_pages, 10) > parseInt(page, 10),
          favouriteLoading: false,
          favouriteLoadingMore: false
        }
      })
      .addCase(fetchFavouriteMovies.rejected, (state, action) => {
        const { message = null } = action?.error

        return {
          ...state,
          favouriteError: state.favouritePage === 1 ? message : null,
          favouriteLoadingMoreError: state.favouritePage > 1 ? message : null,
          favouriteLoading: false,
          favouriteLoadingMore: false
        }
      })
      .addCase(removeFromFavourites.fulfilled, (state, action) => {
        const { id } = action?.payload
        const filteredMovies = [...(state.favouriteMovies || [])].filter(movie => parseInt(movie?.id, 10) !== id)

        return {
          ...state,
          favouriteMovies: filteredMovies,
        }
      })
  },
})


export const { incrementFavouritePage, resetFavouriteError, addMovieToList } = favouriteMoviesSlice.actions


export default favouriteMoviesSlice.reducer


