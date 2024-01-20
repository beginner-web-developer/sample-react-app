import "../App.css";
import { Post, PostFromDB } from "../types/Post";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
    threads: PostFromDB;
};

const BasicThreadList = ({ threads }: Props) => {
    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h4>{"Welcome to my forum!"}</h4>
            <ul id="threads">
                {threads["data"].map((thread: Post, index: number) => (
                    <li key={thread["id"]}>
                        <Link to={"/thread/" + thread["id"]}>{thread["title"]}</Link> by {threads["username"][index]}
                    </li>
                ))}
            </ul>
            <Button type="submit" component={Link} to="/createthread">
                {"Add new thread"}
            </Button>
        </div>
    );
};

export default BasicThreadList;
