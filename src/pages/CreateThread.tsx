import { currentuser } from "./Login";
import { newPost } from "../types/Post";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, InputLabel, Input } from "@mui/material";

const CreateThread: React.FC = () => {
    // event handler for updating input field value
    const [value, setValue] = useState("");
    const UpdateText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };

    // event handler for form submission
    const PostThread = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const title: string = (document.getElementById("post") as HTMLInputElement).value;
        const user_id: number = currentuser["id"];
        console.log(title);
        console.log(user_id);
        const data = {
            post: {
                user_id,
                title,
            },
        };

        fetch("http://127.0.0.1:3001/api/v1/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data: newPost) => {
                if (data["status"] === "success") {
                    const successMessage: HTMLElement | null = document.getElementById("createThreadMessage");
                    if (successMessage !== null) {
                        successMessage.innerHTML = "Thread successfully created";
                    }
                    setValue("");
                } else {
                    const errorMessage: HTMLElement | null = document.getElementById("createThreadMessage");
                    const err: string | undefined = data["error"];
                    if (errorMessage !== null && err !== undefined) {
                        errorMessage.innerHTML = err;
                    }
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <h1 id="createThreadMessage">{"Enter thread name to create."}</h1>
            <form onSubmit={PostThread}>
                <InputLabel htmlFor="post">{"Thread Name"}</InputLabel>
                <Input id="post" value={value} onChange={UpdateText} />
                <Button type="submit">{"Post"}</Button>
            </form>
            <Button component={Link} to="/home">
                {"Back to threads"}
            </Button>
        </>
    );
};

export default CreateThread;
