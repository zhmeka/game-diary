import React from "react";
import { Pane, TableCell } from "evergreen-ui";
import { PillOfGames } from "./PillOfGames";

interface CellOfDayProps {
    date: Date | undefined;
}

export const CellOfDay: React.FC<CellOfDayProps> = ({ date }) => {
    const todayDate = new Date().toLocaleDateString();
    const day = date?.getDate();

    return (
        <TableCell
            overflowX="hidden"
            background={todayDate === date?.toLocaleDateString() ? "green500" : undefined}
        >
            <Pane>
                {day}
                <PillOfGames date={date} />
            </Pane>
        </TableCell>
    );
};
