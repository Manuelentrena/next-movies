import { Movie, MovieDetail, MoviesStore } from "@/core/movies/domain/Movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MoviesStore = {
  movies: [] as Movie[],
  total: 0,
  movieDetail: {} as MovieDetail,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setNextMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = state.movies.concat(action.payload);
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setMovieDetail: (state, action: PayloadAction<MovieDetail>) => {
      state.movieDetail = action.payload;
    },
  },
});

export const { setMovies, setTotal, setMovieDetail, setNextMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
