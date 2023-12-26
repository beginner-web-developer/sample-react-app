import Post from "../types/Post";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, InputLabel, Input } from "@mui/material";

export let currentThreads: Post[] = [
    {
        id: 1,
        thread: "Inspirational Quotes",
        author: "Aiken",
    },
];

const CreateThread: React.FC = () => {
    // event handler for updating input field value
    const [value, setValue] = useState("");
    const UpdateText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };

    // state for appending to thread array
    const [current, setList] = useState(currentThreads);
    const navigate = useNavigate();

    // event handler for form submission: stores data as object of type post in the thread array
    const PostThread = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const threadName = (document.getElementById("post") as HTMLInputElement).value;
        const newList = currentThreads.concat({
            id: current.length + 1,
            thread: threadName,
            author: "default",
        });
        setList(newList);
        setValue("");
        currentThreads = newList;
        navigate("/");
    };

    return (
        <>
            <form onSubmit={PostThread}>
                <InputLabel htmlFor="post">{"Thread Name"}</InputLabel>
                <Input id="post" value={value} onChange={UpdateText} />
                <Button type="submit">{"Post"}</Button>
            </form>
            <Button component={Link} to="/">
                {"Back to threads"}
            </Button>
        </>
    );
};

export default CreateThread;
