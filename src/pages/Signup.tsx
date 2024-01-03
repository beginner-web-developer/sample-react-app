import React, { useState } from "react";
import { Button } from "@mui/material";
import { JsonFunction, useNavigate } from "react-router-dom";
import { JsonObjectExpression, JsonObjectExpressionStatement, JsonSourceFile } from "typescript";

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
            .then((response) => response.json)
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
        navigate("/home");
    };

    return (
        <form onSubmit={createUser}>
            <label htmlFor="newUserName">{"Enter username: "}</label>
            <input id="newUserName" value={name} onChange={UpdateText}></input>
            <br></br>
            <label htmlFor="newName">{"Enter name: "}</label>
            <input id="newName" value={username} onChange={UpdateText}></input>
            <br></br>
            <Button type="submit">{"Sign up"}</Button>
        </form>
    );
};

export default Signup;
