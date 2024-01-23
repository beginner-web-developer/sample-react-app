import "../App.css";
import { Post, PostFromDB } from "../types/Post";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    posts: PostFromDB;
    filter: boolean;
    tag?: string;
};

const BasicThreadList: React.FC<Props> = ({ posts, filter, tag }: Props) => {
    const [threads, setThreads] = useState<PostFromDB>(posts);
    useEffect(() => setThreads(posts), [posts, filter, tag]);
    let data: PostFromDB = {
        data: [],
        username: [],
    };
    useEffect(() => {
        if (filter) {
            setThreads(data);
        }
    }, [data]);

    const filter_posts = () => {
        const username_index: number[] = [];
        let ind: number = 0;
        const filtered: Post[] = posts.data.filter((thread) => thread.tag === tag);
        posts.data.filter((post, index) => {
            if (post.tag === tag) {
                username_index[ind] = index;
                ind++;
            }
        });
        const usernames: string[] = username_index.map((value) => posts.username[value]);
        data = {
            data: filtered,
            username: usernames,
        };
    };

    if (filter) {
        filter_posts();
    }

    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            {filter ? <h4>{`Threads under tag: ${tag}`}</h4> : <h4>{"All threads"}</h4>}
            {threads.data.length === 0 ? <h5>{"No threads currently available."}</h5> : <h5></h5>}
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
