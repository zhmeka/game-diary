import React from "react";
import { Heading, Pane } from "evergreen-ui";
import { useNavigate } from "react-router";

export const Header: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Pane
            is="header"
            background="green500"
            padding={15}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Heading size={600} cursor="pointer" is="h2" onClick={() => navigate("/")}>
                Игровой дневник
            </Heading>
            {/* <IconButton appearance="minimal" icon={<SettingsIcon color="gray900" />} /> */}
        </Pane>
    );
};
