import React from "react";
import { EmptyState, GroupedBarChartIcon } from "evergreen-ui";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GameItemType } from "../../redux/types";
import { StatisticsItem } from "./StatisticsItem";

export const Statistics: React.FC = () => {
    const games = useSelector<RootState, GameItemType[]>((state) => state.games);

    if (!games.length) {
        return (
            <EmptyState
                iconBgColor="#EDEFF5"
                icon={<GroupedBarChartIcon color="#C1C4D6" />}
                title="Тут будет отображаться ваша статистика"
                description="Чем больше данных, тем больше интересного!"
            />
        );
    }
    let allHours = 0;
    let maxHoursGame = {
        hours: Number(games[0].hours),
        title: games[0].title,
    };
    games.forEach(({ hours: stringHours, title }) => {
        const hours = Number(stringHours);
        if (hours > maxHoursGame.hours) {
            maxHoursGame = { hours, title };
        }
        allHours += hours;
    });

    return (
        <>
            <StatisticsItem label="Пройдено игр" value={games.length} />
            {Boolean(allHours) && (
                <>
                    <StatisticsItem label="Всего потрачено времени" value={`${allHours} час.`} />
                    <StatisticsItem
                        label="Cредняя продолжительность прохождения"
                        value={`${(allHours / games.length).toFixed(1)} час.`}
                    />
                    <StatisticsItem
                        label="Cамая долгая игра"
                        value={`${maxHoursGame.title}, ${maxHoursGame.hours} час.`}
                    />
                </>
            )}
        </>
    );
};
