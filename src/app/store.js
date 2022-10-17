import { configureStore } from '@reduxjs/toolkit';
import popularMoviesReducer from 'features/MovieGrid/popularMoviesSlice';
import favouriteMoviesReducer from 'features/MovieGrid/favouriteMoviesSlice';
import searchMoviesReducer from 'features/Search/searchMoviesSlice'

export const store = configureStore({
  reducer: {
    popular: popularMoviesReducer,
    favourite: favouriteMoviesReducer,
    search: searchMoviesReducer
  },
});
