import { currentuser } from "./Login";
import BasicThreadList from "../components/BasicThreadList";
import React from "react";
import { Grow, Chip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    // ensures user is always logged in before seeing home page
    const navigate = useNavigate();
    if (currentuser["name"] === "") {
        navigate("/");
    }
    return (
        <>
            <Chip
                id="profile"
                avatar={<Avatar alt="user" src="../components/Icon.png" />}
                label={currentuser["name"]}
                variant="outlined"
            />
            <Grow timeout={5000} in>
                <h1>Welcome {currentuser["name"]}!</h1>
            </Grow>
            <br />
            <BasicThreadList />
        </>
    );
};

export default Home;
