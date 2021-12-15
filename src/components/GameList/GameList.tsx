import React from "react";
import { EmptyState, InboxSearchIcon, Pane, Table } from "evergreen-ui";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GameItemType } from "../../redux/types";
import { GameListContextMenu } from "./GameListContextMenu";
import { GameListItem } from "./GameListItem";

export const GameList: React.FC = () => {
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });
    const [contextMenu, showContextMenu] = React.useState(false);
    const [selectedGame, setSelectedGame] = React.useState<GameItemType | null>(null);

    const openContextMenuHandler = (x: number, y: number, game: GameItemType) => {
        setCoords({ x, y });
        setSelectedGame(game);
        showContextMenu(true);
    };

    const closeContextMenuHandler = () => {
        showContextMenu(false);
        setSelectedGame(null);
    };

    const games = useSelector<RootState, GameItemType[]>((state) => state.games);
    return (
        <Pane overflowX="auto" border borderRadius={4}>
            <Table minWidth="900px" border="none">
                <Table.Head>
                    <Table.HeaderCell flexBasis={100}>Дата</Table.HeaderCell>
                    <Table.HeaderCell flexBasis={200}>Название</Table.HeaderCell>
                    <Table.HeaderCell flexBasis={400}>Комментарий</Table.HeaderCell>
                    <Table.HeaderCell flexBasis={200}>Теги</Table.HeaderCell>
                    <Table.HeaderCell flexBasis={100}>Наиграно часов</Table.HeaderCell>
                </Table.Head>
                <Table.Body>
                    {games.length > 0 ? (
                        games.map((game) => {
                            return (
                                <GameListItem
                                    key={game.title}
                                    game={game}
                                    openContextMenu={openContextMenuHandler}
                                />
                            );
                        })
                    ) : (
                        <EmptyState
                            title="Игр не обнаружено"
                            description="Добавьте хотя бы одну пройденную игру для отображения в таблице."
                            icon={<InboxSearchIcon color="#C1C4D6" />}
                            iconBgColor="#EDEFF5"
                        />
                    )}
                </Table.Body>
            </Table>
            {contextMenu && selectedGame && (
                <GameListContextMenu
                    x={coords.x}
                    y={coords.y}
                    game={selectedGame}
                    close={closeContextMenuHandler}
                />
            )}
        </Pane>
    );
};
