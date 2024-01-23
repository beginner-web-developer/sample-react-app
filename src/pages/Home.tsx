import { currentuser } from "./Login";
import BasicThreadList from "../components/BasicThreadList";
import { Post, PostFromDB } from "../types/Post";
import NewComment from "../components/NewComment";
import React, { useEffect, useState } from "react";
import { Grow, Chip, Avatar, Button, MenuList, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const tags: string[] = ["Educational", "Entertainment", "Essentials", "News", "Others"];

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
        const [threads, setThreads] = useState<PostFromDB>({
            data: [],
            username: [],
        });
        const getThread = () => {
            fetch("http://127.0.0.1:3001/api/v1/posts")
                .then((response) => response.json())
                .then((data) => setThreads(data));
        };

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

        // edit thread
        const [show, setShow] = useState<boolean>(false);
        const [thread_id, setThread_id] = useState<string>("0");
        const editThread = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setThread_id((event["target"] as HTMLButtonElement).value);
            setShow(true);
        };
        const edit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const title: string = (document.getElementById("body") as HTMLInputElement).value;
            const data = {
                title,
            };
            fetch(`http://127.0.0.1:3001/api/v1/posts/${thread_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    const status: HTMLElement | null = document.getElementById("threadedit");
                    if (data["status"] === "success") {
                        if (status !== null) {
                            status.innerHTML = "Thread successfully updated";
                            setShow(false);
                            getMyThreads();
                            getThread();
                        }
                    } else {
                        if (status !== null) {
                            status.innerHTML = data["error"];
                        }
                    }
                })
                .catch((error) => console.log(error));
        };

        // search threads
        const [filtered, setFilter] = useState<boolean>(false);
        const [tag, setTag] = useState<string>("");
        const search = (tag: string) => {
            setFilter(true);
            setTag(tag);
        };
        const showAll = (tag: string) => {
            setFilter(false);
            setTag(tag);
        };

        useEffect(getThread, []);
        useEffect(getMyThreads, []);

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
                <h3>{"Filter threads by tags:"}</h3>
                <MenuList>
                    <Chip key="All" clickable={true} onClick={() => showAll("All")} label="All" />
                    {tags.map((tag) => (
                        <Chip key={tag} clickable={true} onClick={() => search(tag)} label={tag} />
                    ))}
                </MenuList>
                <Divider variant="middle" />
                <h3 id="msg"></h3>
                <h3>{"My threads:"}</h3>
                <h5 id="threadedit"></h5>
                <ol key="myThreads">
                    {myThreads?.map((thread) => (
                        <>
                            <li key={"thread" + thread["id"]}>{thread["title"]}</li>
                            <Button
                                id={"delete" + thread["id"]}
                                key={"delete" + thread["id"]}
                                value={thread["id"]}
                                onClick={deleteThread}
                            >
                                {"Delete"}
                            </Button>
                            <Button
                                id={"edit" + thread["id"]}
                                key={"edit" + thread["id"]}
                                value={thread["id"]}
                                onClick={editThread}
                            >
                                {"Edit"}
                            </Button>
                            <NewComment show={show} setShow={setShow} formHandler={edit} name="thread" />
                        </>
                    ))}
                </ol>
                <Divider variant="middle" />
                <BasicThreadList posts={threads} filter={filtered} tag={tag} />
            </>
        );
    }
};

export default Home;
