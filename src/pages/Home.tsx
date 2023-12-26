import { currentThreads } from "./CreateThread";
import BasicThreadList from "../components/BasicThreadList";
import React from "react";
import { Grow } from "@mui/material";

const Home: React.FC = () => {
    //const name: string = "Guest";
    return (
        <>
            <Grow timeout={5000} in>
                <h1>{`Welcome! Login to continue.`}</h1>
            </Grow>
            <br />
            <BasicThreadList thread={currentThreads} />
        </>
    );
};

export default Home;
