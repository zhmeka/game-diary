import React from "react";
import { Badge, minorScale, Pane, Table } from "evergreen-ui";
import { GameItemType } from "../../redux/types";
import getCorrectDate from "../../functions/getCorrectDate";

interface GameListItemProps {
    game: GameItemType;
    openContextMenu: (x: number, y: number, game: GameItemType) => void;
}

export const GameListItem: React.FC<GameListItemProps> = ({ game, openContextMenu }) => {
    const correctDate = getCorrectDate(game.date);
    const minorSpace = minorScale(2);
    const contextMenuHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        openContextMenu(event.pageX, event.pageY, game);
    };

    return (
        <Table.Row hoverElevation={1} height="auto" onContextMenu={contextMenuHandler}>
            <Table.Cell flexBasis={100}>{correctDate}</Table.Cell>
            <Table.Cell flexBasis={200}>{game.title}</Table.Cell>
            <Table.Cell flexBasis={400} paddingY={minorSpace}>
                {game.commentary}
            </Table.Cell>
            <Table.Cell flexBasis={200}>
                <Pane display="flex" flexWrap="wrap">
                    {game.tags &&
                        game.tags.map((tag) => {
                            return (
                                <Pane margin={minorSpace}>
                                    <Badge color="neutral">{tag}</Badge>
                                </Pane>
                            );
                        })}
                </Pane>
            </Table.Cell>
            <Table.Cell flexBasis={100}>{game.hours}</Table.Cell>
        </Table.Row>
    );
};
