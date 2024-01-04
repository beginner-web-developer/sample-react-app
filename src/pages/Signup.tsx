import { newUser } from "../types/User";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const UpdateText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.target.id === "newUserName") {
            setName(event.target.value);
        } else {
            setUsername(event.target.value);
        }
    };

    const navigate = useNavigate();

    // Post request to DB for saving information
    const createUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username: string = (document.getElementById("newUserName") as HTMLInputElement).value;
        const name: string = (document.getElementById("newName") as HTMLInputElement).value;
        const data = {
            user: {
                username,
                name,
            },
        };

        fetch("http://127.0.0.1:3001/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data: newUser) => {
                console.log(data);
                if (data["status"] === "success") {
                    const successMessage: HTMLElement | null = document.getElementById("message");
                    if (successMessage !== null) {
                        successMessage.innerHTML = "Account successfully created";
                    }
                    navigate("/login");
                } else {
                    const errorMessage: HTMLElement | null = document.getElementById("createError");
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
            <h1 id="createError"></h1>
            <form onSubmit={createUser}>
                <label htmlFor="newUserName">{"Enter username: "}</label>
                <input id="newUserName" value={name} onChange={UpdateText}></input>
                <br></br>
                <label htmlFor="newName">{"Enter name: "}</label>
                <input id="newName" value={username} onChange={UpdateText}></input>
                <br></br>
                <Button type="submit">{"Sign up"}</Button>
            </form>
        </>
    );
};

export default Signup;
