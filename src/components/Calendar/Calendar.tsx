import React from "react";
import { Table } from "evergreen-ui";
import { WEEK } from "../../consts";
import getMonthDate from "../../functions/getMonthDate";
import { CalendarHeader } from "./CalendarHeader";
import { RowOfWeek } from "./RowOfWeek";

export const Calendar: React.FC = () => {
    const [date, setDate] = React.useState<Date>(new Date());
    const days = getMonthDate(date.getFullYear(), date.getMonth());
    const changeDateHandler = (date: Date) => {
        setDate(date);
    };

    return (
        <>
            <CalendarHeader date={date} changeDate={changeDateHandler} />
            <Table>
                <Table.Head paddingRight={0}>
                    {WEEK.map((item) => {
                        return <Table.HeaderCell key={item}>{item}</Table.HeaderCell>;
                    })}
                </Table.Head>
                <Table.Body>
                    {days.map((week, i) => {
                        return <RowOfWeek key={i} week={week} />;
                    })}
                </Table.Body>
            </Table>
        </>
    );
};
