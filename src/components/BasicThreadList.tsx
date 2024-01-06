import "../App.css";
import { Post } from "../types/Post";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../types/User";

const BasicThreadList = () => {
    const [threads, setThreads] = useState([]);
    // fetch threads from server once
    useEffect(() => {
        fetch("http://127.0.0.1:3001/api/v1/posts")
            .then((response) => response.json())
            .then((data) => setThreads(data));
    }, []);

    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h4>{"Welcome to my forum!"}</h4>
            <ul id="threads">
                {threads.map((thread: Post) => (
                    <li key={thread["id"]}>
                        <Link to={"/thread/" + thread["id"]}>{thread["title"]}</Link> by {thread["user_id"]}
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
