import React from "react";
import { TableRow } from "evergreen-ui";
import { CellOfDay } from "./CellOfDay";

interface RowOfWeekProps {
    week: Date[] | undefined[];
}

export const RowOfWeek: React.FC<RowOfWeekProps> = ({ week }) => {
    return (
        <TableRow>
            {week.map((dateOfDay, i) => {
                return <CellOfDay key={i} date={dateOfDay} />;
            })}
        </TableRow>
    );
};
