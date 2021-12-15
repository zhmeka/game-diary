import React from "react";
import { Calendar } from "./components/Calendar";
import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { GameList } from "./components/GameList";
import { Statistics } from "./components/Statistics";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Statistics />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="list" element={<GameList />} />
            </Route>
        </Routes>
    );
};

export default App;
