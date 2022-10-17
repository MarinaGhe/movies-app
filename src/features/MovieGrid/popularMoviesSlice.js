import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from 'tools/utility'


export const fetchPopularMovies = createAsyncThunk(
  'popular/fetchPopularMovies',
  async (page, thunkAPI) => {
    const data = await fetchData(`${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&include_adult=false`, {
      method: 'GET',
      signal: thunkAPI.signal
    })

    return data
  }
)

export const addToFavourites = createAsyncThunk(
  'add/addToFavourites',
  async ({ id, dataToSend }, thunkAPI) => {
    const data = await fetchData(`${process.env.REACT_APP_BASE_URL}/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`, {
      method: 'POST',
      body: dataToSend,
      signal: thunkAPI.signal
    })

    return data
  }
)

const initialState = {
  popularPage: 1,
  popularMovies: null,
  popularLoading: false,
  popularError: null,
  popularHasMore: false,
  popularLoadingMore: false,
  popularLoadingMoreError: null,
}

export const popularMoviesSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    incrementPopularPage: (state, action) => {
      return {
        ...state,
        popularPage: state.popularPage + 1
      }
    },
    resetPopularError: (state, action) => {
      return {
        ...state,
        popularError: null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        return {
          ...state,
          popularLoading: !!(state.popularPage === 1),
          popularLoadingMore: !!(state.popularPage > 1),
          popularError: null,
          popularLoadingMoreError: null,
          addFavouriteError: null
        }
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        const { page, total_pages, results = [] } = action?.payload
        const popularMoviesPrev = [...(state.popularMovies || [])]
        const popularMoviesIds = popularMoviesPrev.map(movie => movie?.id)
        const popularReceived = results.filter(result => popularMoviesIds?.indexOf(result?.id) === -1)

        return {
          ...state,
          popularMovies: state.popularPage === 1 ? results : [...popularMoviesPrev, ...popularReceived],
          popularPage: page,
          popularHasMore: parseInt(total_pages, 10) > parseInt(page, 10),
          popularLoading: false,
          popularLoadingMore: false
        }
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        const { message = null } = action.error

        return {
          ...state,
          popularError: state.popularPage === 1 ? message : null,
          popularLoadingMoreError: state.popularPage > 1 ? message : null,
          popularLoading: false,
          popularLoadingMore: false
        }
      })
      .addCase(addToFavourites.pending, (state, action) => {
        return {
          ...state,
          addFavouriteLoading: true
        }
      })
      .addCase(addToFavourites.fulfilled, (state, action) => {
        return {
          ...state,
          addFavouriteLoading: false
        }
      })
      .addCase(addToFavourites.rejected, (state, action) => {
        const { message = null } = action.error

        return {
          ...state,
          addFavouriteError: message,
          addFavouriteLoading: false
        }
      })
  },
})


export const { incrementPopularPage, resetPopularError } = popularMoviesSlice.actions


export default popularMoviesSlice.reducer


