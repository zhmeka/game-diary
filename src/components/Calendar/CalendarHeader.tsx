import React from "react";
import {
    Button,
    ChevronLeftIcon,
    ChevronRightIcon,
    Group,
    Heading,
    majorScale,
    Pane,
} from "evergreen-ui";
import { MONTHS } from "../../consts";

interface CalendarHeaderProps {
    date: Date;
    changeDate: (date: Date) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ date, changeDate }) => {
    const space = majorScale(2);
    const switchMonthHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        type valueType = {
            [key: string]: number;
        };
        const value: valueType = {
            prev: -1,
            next: 1,
        };

        const name = event.currentTarget.getAttribute("data-name");
        let newDate = name ? new Date(date) : new Date();

        if (name) newDate.setMonth(date.getMonth() + value[name]);
        changeDate(newDate);
    };

    return (
        <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={space}
        >
            <Group>
                <Button data-name="prev" onClick={switchMonthHandler}>
                    <ChevronLeftIcon />
                </Button>
                <Button onClick={switchMonthHandler}>Сегодня</Button>
                <Button data-name="next" onClick={switchMonthHandler}>
                    <ChevronRightIcon />
                </Button>
            </Group>
            <Pane>
                <Heading is="h2">
                    {MONTHS[date.getMonth()]} {date.getFullYear()}
                </Heading>
            </Pane>
        </Pane>
    );
};
