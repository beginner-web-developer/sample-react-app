import { currentuser } from "./Login";
import BasicThreadList from "../components/BasicThreadList";
import { Post } from "../types/Post";
import React, { useState } from "react";
import { Grow, Chip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    // ensures user is always logged in before seeing home page
    const navigate = useNavigate();
    if (currentuser["name"] === "" || currentuser["id"] === 0) {
        navigate("/");
    } else {
        // shows users the threads that they created
        const [myThreads, setMyThreads] = useState<Post[]>();
        const user_id: number = currentuser["id"];
        const getMyThreads = () => {
            fetch(`http://127.0.0.1:3001/api/v1/users/${user_id}`)
                .then((response) => response.json())
                .then((data) => setMyThreads(data));
        };

        // shows users all threads
        const [threads, setThreads] = useState({
            data: [],
            username: "",
        });
        const getThread = () => {
            fetch("http://127.0.0.1:3001/api/v1/posts")
                .then((response) => response.json())
                .then((data) => setThreads(data));
        };
        getThread();

        // delete thread
        const deleteThread = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const thread_id: string = (event["target"] as HTMLButtonElement).value;
            fetch(`http://127.0.0.1:3001/api/v1/posts/${thread_id}`, {
                method: "DELETE",
            })
                .then((response) => response.json())
                .then((data) => {
                    const msg = document.getElementById("msg");
                    if (msg !== null) {
                        msg.innerHTML = data["message"];
                    }
                    getMyThreads();
                    getThread();
                })
                .catch((error) => console.log(error));
        };

        getMyThreads();
        return (
            <>
                <Chip
                    id="profile"
                    avatar={<Avatar>{currentuser["name"][0]}</Avatar>}
                    label={currentuser["name"]}
                    variant="outlined"
                />
                <Grow timeout={5000} in>
                    <h1>Welcome {currentuser["name"]}!</h1>
                </Grow>
                <br />
                <h3 id="msg"></h3>
                <h3>{"My threads:"}</h3>
                <ol key="myThreads">
                    {myThreads?.map((thread) => (
                        <>
                            <li key={"thread" + thread["id"]}>{thread["title"]}</li>
                            <button
                                id={"button" + thread["id"]}
                                key={"button" + thread["id"]}
                                value={thread["id"]}
                                onClick={deleteThread}
                            >
                                {"Delete"}
                            </button>
                        </>
                    ))}
                </ol>
                <BasicThreadList threads={threads} />
            </>
        );
    }
};

export default Home;
