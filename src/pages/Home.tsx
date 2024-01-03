import { currentThreads } from "./CreateThread";
import BasicThreadList from "../components/BasicThreadList";
import React from "react";
import { Grow, Chip, Avatar } from "@mui/material";

const Home: React.FC = () => {
    return (
        <>
            <Chip
                id="profile"
                avatar={<Avatar alt="user" src="sample-react-app\src\components\Icon.png" />}
                label="Avatar"
                variant="outlined"
            />
            <h1 id="success"></h1>
            <Grow timeout={5000} in>
                <h1>{`Welcome!`}</h1>
            </Grow>
            <br />
            <BasicThreadList thread={currentThreads} />
        </>
    );
};

export default Home;
