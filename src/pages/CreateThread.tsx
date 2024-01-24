import { tags } from "./Home";
import { currentuser } from "./Login";
import { url } from "../url";
import { newPost } from "../types/Post";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, InputLabel, Input } from "@mui/material";

const CreateThread: React.FC = () => {
    // event handler for updating input field value
    const [value, setValue] = useState<string>("");
    const UpdateText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const [tag, setTag] = useState<string>("Educational");

    // event handler for form submission
    const PostThread = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const title: string = (document.getElementById("post") as HTMLInputElement).value;
        const user_id: number = currentuser["id"];
        const tag: string = (document.getElementById("tag") as HTMLSelectElement).value;
        const data = {
            post: {
                user_id,
                title,
                tag,
            },
        };

        fetch(`${url}/api/v1/posts`, {
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
                <InputLabel htmlFor="tag">{"Tag:"}</InputLabel>
                <select name="tag" id="tag" value={tag} onChange={(e) => setTag(e.target.value)}>
                    {tags.map((tag, index) => (
                        <option key={"option" + index} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
                <Button type="submit">{"Post"}</Button>
            </form>
            <Button component={Link} to="/home">
                {"Back to threads"}
            </Button>
        </>
    );
};

export default CreateThread;
