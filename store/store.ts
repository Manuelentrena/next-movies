import favsReducer from "@/store/favs/favs.slice";
import moviesReducer from "@/store/movies/movies.slice";
import searchReducer from "@/store/search/search.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    searchReducer,
    moviesReducer,
    favsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
