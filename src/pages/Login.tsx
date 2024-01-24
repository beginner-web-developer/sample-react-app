import { url } from "../url";
import { User } from "../types/User";
import React, { useState } from "react";
import { Grow, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export let currentuser: User = {
    id: 0,
    username: "",
    name: "",
    created_at: new Date(2023, 12, 31, 23, 59, 59),
    updated_at: new Date(2023, 12, 31, 23, 59, 59),
};

const Login: React.FC = () => {
    // event handler for updating input field value
    const [name, setName] = useState("");
    const UpdateText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(event.target.value);
    };

    const navigate = useNavigate();

    // event handler for form submission: checks if username is valid
    const Validate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username: string = (document.getElementById("username") as HTMLInputElement).value;
        fetch(`${url}/api/v1/users`)
            .then((response) => response.json())
            .then((data) => {
                const account: User[] = data.filter((user: User) => user["username"] === username);
                if (account.length === 0) {
                    const error: HTMLElement | null = document.getElementById("errorMessage");
                    if (error !== null) {
                        error.innerHTML = "No account found for user: " + username;
                        setName("");
                    }
                } else {
                    currentuser = account[0];
                    navigate("/home");
                }
            });
    };

    return (
        <>
            <h1 id="message"></h1>
            <Grow timeout={5000} in>
                <h1 id="errorMessage">{"Welcome! Login to continue."}</h1>
            </Grow>
            <form onSubmit={Validate}>
                <label htmlFor="username">{"Username"}</label>
                <br></br>
                <input id="username" value={name} onChange={UpdateText} />
                <br></br>
                <Button type="submit">{"Sign in"}</Button>
            </form>
            <br></br>
            <div>
                {"Not a user yet?"}
                <Chip label="Sign up here!" component="a" href="/signup" variant="outlined" clickable />
            </div>
        </>
    );
};

export default Login;
