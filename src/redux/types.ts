export type GameItemType = {
    title: string;
    date: string;
    commentary: string;
    hours: string;
    tags: string[];
};

export type GameFormType = {
    display: boolean;
    isEdit: boolean;
    game: GameItemType;
};

export type GameListActionType = {
    type: string;
    payload: any;
};
