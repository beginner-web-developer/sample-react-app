import { currentuser } from "./Login";
import { url } from "../url";
import BasicCommentList from "../components/CommentList";
import { Subpost, newSubpost } from "../types/Subpost";
import { Post } from "../types/Post";
import NewComment from "../components/NewComment";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export let subposts: Subpost[] = [];
export let subposts_authors: string[] = [];

const StyledThreadView: React.FC = () => {
    // fetching subposts for the particular post
    const [post, setPost] = useState<Post>({
        id: 0,
        user_id: 0,
        title: "",
        tag: "",
        created_at: new Date(),
        updated_at: new Date(),
    });
    const [post_author, setAuthor] = useState<string>("");

    const urlParams = useParams();
    const post_id: string | undefined = urlParams["threadid"];
    const getSubposts = () => {
        fetch(`${url}/api/v1/posts/${post_id}`)
            .then((response) => response.json())
            .then((data) => {
                setAuthor(data["username_post"]);
                setPost(data["post"]);
                subposts = data["subposts"];
                subposts_authors = data["username_subpost"];
            });
    };

    // form for adding comment
    const [show, setShow] = useState<boolean>(false);
    const showForm = () => setShow(true);

    // event handler for form submission
    const CreateComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body: string = (document.getElementById("body") as HTMLInputElement).value;
        const user_id: number = currentuser["id"];
        const data = {
            user_id,
            post_id: post["id"],
            body,
        };

        fetch(`${url}/api/v1/subposts`, {
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

    useEffect(getSubposts, []);

    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            <Card>
                <CardContent>
                    <Typography component="p">{"Viewing thread:"}</Typography>
                    <Typography variant="h5" component="h5">
                        {post["title"]}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {"by " + post_author}
                    </Typography>
                </CardContent>
            </Card>

            <BasicCommentList styled={true} />

            <Button variant="contained" color="secondary" onClick={showForm}>
                {"Add comment"}
            </Button>
            <NewComment show={show} setShow={setShow} formHandler={CreateComment} name="comment" />

            <Link to="/home">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default StyledThreadView;
