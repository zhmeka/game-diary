import React from "react";
import {
    Button,
    Dialog,
    majorScale,
    Pane,
    Strong,
    TagInput,
    Textarea,
    TextInput,
    toaster,
} from "evergreen-ui";
import { GameFormType, GameItemType } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addGame, closeForm, saveChanges } from "../../redux/actions";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const GameForm: React.FC = () => {
    const existingGames = useSelector<RootState, GameItemType[]>((state) => state.games);
    const form = useSelector<RootState, GameFormType>((state) => state.form);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setGameInfo(form.game);
    }, [form.game]);

    const [gameInfo, setGameInfo] = React.useState(form.game);
    const [invalid, setInvalid] = React.useState<boolean>(false);

    const closeHandler = () => {
        dispatch(closeForm());
        setGameInfo(form.game);
    };

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGameInfo({ ...gameInfo, [event.target.name]: event.target.value });
    };

    const changeTagHandler = (newTags: string[]) => {
        setGameInfo({ ...gameInfo, tags: newTags });
    };

    const addGameHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (!existingGames.some((game) => game.title === gameInfo.title)) {
            setInvalid(false);
            toaster.success("Игра успешно добавлена!", {
                duration: 2,
            });
            dispatch(addGame(gameInfo));
            closeHandler();
        } else {
            toaster.danger("Игра с таким именем уже есть!");
            setInvalid(true);
        }
    };

    const editExistingGameHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (form.game === gameInfo) {
            toaster.warning("Нет изменений для сохранения :(");
        } else {
            dispatch(saveChanges({ old: form.game, new: gameInfo }));
            toaster.success("Изменения успешно сохранены!");
            closeHandler();
        }
    };

    const isMobile = useMediaQuery("(max-width: 425px)");
    const spaceBottom = majorScale(2);
    return (
        <Dialog
            title="Добавить новую игру"
            isShown={form.display}
            onCloseComplete={closeHandler}
            hasHeader={false}
            hasFooter={false}
        >
            <Pane paddingY={spaceBottom}>
                <form onSubmit={form.isEdit ? editExistingGameHandler : addGameHandler}>
                    <Pane marginBottom={spaceBottom}>
                        <Strong>Название игры *</Strong>
                        <TextInput
                            value={gameInfo.title}
                            onChange={inputHandler}
                            name="title"
                            isInvalid={invalid}
                            required
                            display="block"
                            width="100%"
                            placeholder="Название игры"
                        />
                    </Pane>
                    <Pane
                        marginBottom={spaceBottom}
                        display="grid"
                        gridTemplateColumns={isMobile ? "1fr" : "1fr 1fr"}
                        gap={spaceBottom}
                    >
                        <Pane>
                            <Strong>Проведено часов</Strong>
                            <TextInput
                                value={gameInfo.hours}
                                onChange={inputHandler}
                                min={0}
                                name="hours"
                                type="number"
                                display="block"
                                width="100%"
                                placeholder="Проведено часов"
                            />
                        </Pane>
                        <Pane>
                            <Strong>Дата прохождения</Strong>
                            <TextInput
                                value={gameInfo.date}
                                onChange={inputHandler}
                                name="date"
                                type="date"
                                display="block"
                                width="100%"
                                placeholder="Дата прохождения"
                            />
                        </Pane>
                    </Pane>
                    <Pane marginBottom={spaceBottom}>
                        <Strong>Теги</Strong>
                        <TagInput
                            values={gameInfo.tags}
                            inputProps={{ placeholder: "Теги" }}
                            tagSubmitKey="space"
                            onChange={changeTagHandler}
                            display="block"
                            width="100%"
                            placeholder="Теги"
                        />
                    </Pane>
                    <Pane marginBottom={spaceBottom}>
                        <Strong>Комментарий *</Strong>
                        <Textarea
                            value={gameInfo.commentary}
                            onChange={inputHandler}
                            name="commentary"
                            required
                            display="block"
                            width="100%"
                            resize="vertical"
                            placeholder="Комментарий"
                        />
                    </Pane>
                    <Button type="submit" width="100%" intent="success" appearance="primary">
                        {form.isEdit ? "Сохранить" : "Добавить"}
                    </Button>
                </form>
            </Pane>
        </Dialog>
    );
};
