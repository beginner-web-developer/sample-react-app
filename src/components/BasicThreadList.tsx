import "../App.css";
import Post from "../types/Post";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type ThreadListProps = {
    thread: Post[];
};

const BasicThreadList = (props: ThreadListProps) => {
    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h4>{"Welcome to my forum!"}</h4>
            <ul id="threads">
                {props.thread.map((post) => (
                    <li key={post.id}>
                        <Link to="/thread/1">{post.thread}</Link> by {post.author}
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
