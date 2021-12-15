import { combineReducers, createStore } from "redux";
import { gameFormReducer } from "./gameFormReducer";
import { gameListReducer } from "./gameListReducer";

export const store = createStore(
    combineReducers({ games: gameListReducer, form: gameFormReducer })
);

store.subscribe(() => {
    localStorage.setItem("games", JSON.stringify(store.getState().games));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
