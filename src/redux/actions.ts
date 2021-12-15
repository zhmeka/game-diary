import { GameItemType } from "./types";

export enum GameActions {
    Add = "ADD_GAME",
    SaveChanges = "SAVE_GAME_CHANGES",
    Delete = "DELETE_GAME",
}

export enum FormActions {
    New = "SHOW_NEW_FORM",
    Existed = "SHOW_EXISTED_FORM",
    Close = "CLOSE_FORM",
}

export function addGame(payload: any) {
    return {
        type: GameActions.Add,
        payload,
    };
}

export function saveChanges(payload: any) {
    return {
        type: GameActions.SaveChanges,
        payload,
    };
}

export const deleteGame = (payload: string) => {
    return {
        type: GameActions.Delete,
        payload,
    };
};

export const showNewForm = () => {
    return {
        type: FormActions.New,
    };
};

export const showExistedForm = (payload: GameItemType) => {
    return {
        type: FormActions.Existed,
        payload,
    };
};

export const closeForm = () => {
    return {
        type: FormActions.Close,
    };
};
