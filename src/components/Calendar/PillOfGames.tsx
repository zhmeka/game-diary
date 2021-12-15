import React from "react";
import { minorScale, Pane, Pill, Text, Tooltip } from "evergreen-ui";
import { useSelector } from "react-redux";
import getCorrectDate from "../../functions/getCorrectDate";
import { RootState } from "../../redux/store";
import { GameItemType } from "../../redux/types";

interface PillOfGamesProps {
    date: Date | undefined;
}

export const PillOfGames: React.FC<PillOfGamesProps> = ({ date }) => {
    const games = useSelector<RootState, GameItemType[]>((state) => state.games);
    const filteredGames = games.filter(
        (game) => getCorrectDate(game.date) === date?.toLocaleDateString()
    );

    if (!filteredGames.length) {
        return null;
    }
    const space = minorScale(2);
    return (
        <Tooltip
            content={
                <>
                    {filteredGames.map((game, i) => {
                        return (
                            <Pane
                                borderBottom={i === filteredGames.length - 1 ? false : true}
                                paddingY={space}
                            >
                                <Text color="white">{game.title}</Text>
                            </Pane>
                        );
                    })}
                </>
            }
        >
            <Pill cursor="default" margin={space} color="red">
                {filteredGames.length}
            </Pill>
        </Tooltip>
    );
};
