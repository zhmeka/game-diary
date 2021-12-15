import React from "react";
import { majorScale, Pane, Strong, Text } from "evergreen-ui";

interface StatisticsItemProps {
    label: string;
    value: string | number;
}

export const StatisticsItem: React.FC<StatisticsItemProps> = ({ label, value }) => {
    const space = majorScale(2);

    return (
        <Pane padding={space}>
            <Text>{label}: </Text>
            <Strong>{value}</Strong>
        </Pane>
    );
};
