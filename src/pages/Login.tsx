import React, { useState } from "react";
import { Grow, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        fetch("http://127.0.0.1:3001/api/v1/users")
            .then((response) => response.json())
            .then((data) => {
                const account: { [key: string]: string | number }[] = data.filter(
                    (user: { [key: string]: string | number }) => user["username"] === username,
                );
                if (account[0] === undefined) {
                    const error: HTMLElement | null = document.getElementById("errorMessage");
                    if (error !== null) {
                        error.innerHTML = "No account found for user: " + username;
                        setName("");
                    }
                } else {
                    const success: HTMLElement | null = document.getElementById("success");
                    const profile: HTMLElement | null = document.getElementById("profile");
                    if (success !== null && profile !== null) {
                        success.innerHTML = "Sucessfully Logged In!";
                        return account[0];
                    }
                    navigate("/home");
                }
            });
    };

    return (
        <>
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
