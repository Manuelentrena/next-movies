import { MOVIE_BY_DEFAULT, PAGE_BY_DEFAULT, TYPE_BY_DEFAULT } from "@/config/initial";
import { Search } from "@/core/movies/domain/contract/MovieRepository";
import { TypesMovie } from "@/core/movies/domain/Movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Search = {
  page: PAGE_BY_DEFAULT,
  title: MOVIE_BY_DEFAULT,
  type: TYPE_BY_DEFAULT,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    setSearchParams: (state, action: PayloadAction<{ title: string; type: TypesMovie }>) => {
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.page = PAGE_BY_DEFAULT;
    },
  },
});

export const { incrementPage, setSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
