import { FormActions } from "./actions";
import { GameFormType, GameItemType, GameListActionType } from "./types";

const emptyGame: GameItemType = {
    title: "",
    hours: "0",
    date: new Date().toISOString().slice(0, 10),
    commentary: "",
    tags: [],
};

const initialState = {
    display: false,
    isEdit: false,
    game: emptyGame,
};

export const gameFormReducer = (state: GameFormType = initialState, action: GameListActionType) => {
    switch (action.type) {
        case FormActions.New:
            return {
                display: true,
                isEdit: false,
                game: emptyGame,
            };
        case FormActions.Existed:
            return {
                display: true,
                isEdit: true,
                game: action.payload,
            };
        case FormActions.Close:
            return initialState;
        default:
            return state;
    }
};
