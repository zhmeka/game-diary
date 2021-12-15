import { GameActions } from "./actions";
import { GameItemType, GameListActionType } from "./types";

function initialState(): GameItemType[] {
    const games = localStorage.getItem("games");
    if (games) {
        return JSON.parse(games);
    }
    return [];
}

export const gameListReducer = (
    state: GameItemType[] = initialState(),
    action: GameListActionType
) => {
    switch (action.type) {
        case GameActions.Add:
            return [
                ...state,
                {
                    ...action.payload,
                },
            ];
        case GameActions.SaveChanges:
            return state.map((game) => {
                if (game.title === action.payload.old.title) {
                    game = action.payload.new;
                }
                return game;
            });
        case GameActions.Delete:
            return state.filter((game) => game.title !== action.payload);
        default:
            return state;
    }
};
