import React from "react";
import { Link, Pane, Text } from "evergreen-ui";

export const Footer: React.FC = () => {
    return (
        <Pane textAlign="center">
            <Text color="muted">2021 | </Text>
            <Link href="https://github.com/zhmeka">GitHub</Link>
        </Pane>
    );
};
