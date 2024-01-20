import { currentuser } from "../pages/Login";
import { newSubpost } from "../types/Subpost";
import { Button, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";

type Props = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    thread_id: number;
    thread_name: string;
};

const NewComment: React.FC<Props> = ({ show, setShow, thread_id, thread_name }: Props) => {
    // event handler for updating input field value
    const [value, setValue] = useState("");
    const UpdateText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };

    // event handler for form submission
    const CreateComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body: string = (document.getElementById("body") as HTMLInputElement).value;
        const user_id: number = currentuser["id"];
        const data = {
            user_id,
            post_id: thread_id,
            body,
        };

        fetch("http://127.0.0.1:3001/api/v1/subposts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data: newSubpost) => {
                if (data["status"] === "success") {
                    const successMessage: HTMLElement | null = document.getElementById("createCommentMessage");
                    if (successMessage !== null) {
                        successMessage.innerHTML = "Thread successfully created";
                    }
                    setValue("");
                    setShow(false);
                } else {
                    const errorMessage: HTMLElement | null = document.getElementById("createCommentMessage");
                    const err: string | undefined = data["error"];
                    if (errorMessage !== null && err !== undefined) {
                        errorMessage.innerHTML = err;
                    }
                }
            })
            .catch((error) => console.log(error));
    };

    // controls the hiding and showing of the form
    if (show) {
        return (
            <>
                <h1 id="createCommentMessage">{"Enter comment to create."}</h1>
                <form onSubmit={CreateComment}>
                    <InputLabel htmlFor="post">{"Comment"}</InputLabel>
                    <Input id="body" value={value} onChange={UpdateText} />
                    <Button type="submit">{"Post"}</Button>
                </form>
                <Button onClick={() => setShow(false)}>{`Back to thread: ${thread_name}`}</Button>
            </>
        );
    } else {
        return <></>;
    }
};

export default NewComment;
