import { Movie } from "@/core/movies/domain/Movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavsState {
  favsMovies: Movie[];
}

const initialState: FavsState = {
  favsMovies: [] as Movie[],
};

export const favsSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavMovie: (state, action: PayloadAction<Movie>) => {
      const movieExists = state.favsMovies.some((movie) => movie.Id === action.payload.Id);
      if (!movieExists) {
        state.favsMovies.push(action.payload);
      }
    },
    removeFavMovie: (state, action: PayloadAction<string>) => {
      state.favsMovies = state.favsMovies.filter((movie) => movie.Id !== action.payload);
    },
  },
});

export const { addFavMovie, removeFavMovie } = favsSlice.actions;

export default favsSlice.reducer;
