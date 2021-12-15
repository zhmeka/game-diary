import React from "react";
import { minorScale, Pane, Tab } from "evergreen-ui";
import { useLocation, useNavigate } from "react-router";

interface NavTabProps {
    to: string;
    title: string | null;
    icon?: JSX.Element;
}

export const NavTab: React.FC<NavTabProps> = ({ icon, to, title }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const space = minorScale(3);

    return (
        <Tab onSelect={() => navigate(to)} isSelected={location.pathname === "/" + to}>
            {icon}
            {title ? <Pane marginLeft={space}>{title}</Pane> : null}
        </Tab>
    );
};
