import React from "react";
import { Button, CalendarIcon, ListIcon, majorScale, Pane, PlusIcon, Tablist } from "evergreen-ui";
import { Outlet } from "react-router";
import { Header } from "../Header";
import { NavTab } from "../UI/NavTab";
import { GameForm } from "../GameForm";
import { useDispatch } from "react-redux";
import { showNewForm } from "../../redux/actions";
import { Footer } from "../Footer";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const Layout: React.FC = () => {
    const dispatch = useDispatch();
    const space = majorScale(2);
    const showCreateGameFormHandler = () => {
        dispatch(showNewForm());
    };

    const isMobile = useMediaQuery("(max-width: 425px)");

    return (
        <>
            <Header />
            <Pane
                display="flex"
                alignItems="center"
                justifyContent={isMobile ? "space-between" : null}
                padding={space}
            >
                <Button
                    marginRight={space}
                    iconBefore={<PlusIcon />}
                    appearance="primary"
                    onClick={showCreateGameFormHandler}
                >
                    Добавить игру
                </Button>
                <Tablist>
                    <NavTab icon={<ListIcon />} to="list" title={isMobile ? null : "Список"} />
                    <NavTab
                        icon={<CalendarIcon />}
                        to="calendar"
                        title={isMobile ? null : "Каледнарь"}
                    />
                </Tablist>
            </Pane>
            <Pane borderTop borderBottom padding={space}>
                <Outlet />
            </Pane>
            <Pane is="footer" padding={space}>
                <Footer />
            </Pane>
            <GameForm />
        </>
    );
};
