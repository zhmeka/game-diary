import React from "react";
import { EditIcon, Menu, Pane, ShareIcon, TrashIcon } from "evergreen-ui";
import { useDispatch } from "react-redux";
import { deleteGame, showExistedForm } from "../../redux/actions";
import { GameItemType } from "../../redux/types";

interface ContextMenuProps {
    x: number;
    y: number;
    close: () => void;
    game: GameItemType;
}

export const GameListContextMenu: React.FC<ContextMenuProps> = ({ x, y, close, game }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const clickOutsideHandler = (event: MouseEvent) => {
        //@ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
            close();
        }
    };

    const editGameHandler = () => {
        close();
        dispatch(showExistedForm(game));
    };

    const shareGameHandler = () => {
        if (navigator) {
            navigator.share({
                title: `Мне удалось пройти ${game.title}!`,
                text: game.commentary,
            });
        }
        close();
    };

    const deleteGameHandler = () => {
        dispatch(deleteGame(game.title));
        close();
    };

    React.useEffect(() => {
        document.addEventListener("click", clickOutsideHandler);
        return () => {
            document.removeEventListener("click", clickOutsideHandler);
        };
    });

    return (
        <Pane ref={ref} position="absolute" top={y} left={x} elevation={2}>
            <Menu>
                <Menu.Item icon={EditIcon} onClick={editGameHandler}>
                    Изменить
                </Menu.Item>
                <Menu.Item icon={ShareIcon} onClick={shareGameHandler}>
                    Поделиться
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={deleteGameHandler} intent="danger" icon={TrashIcon}>
                    Удалить
                </Menu.Item>
            </Menu>
        </Pane>
    );
};
