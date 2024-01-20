import BasicCommentList from "../components/CommentList";
import { Subpost } from "../types/Subpost";
import { Post } from "../types/Post";
import NewComment from "../components/NewComment";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";

export let subposts: Subpost[] = [];
export let subposts_authors: string[] = [];

const StyledThreadView: React.FC = () => {
    // fetching subposts for the particular post
    const [post, setPost] = useState<Post>({
        id: 0,
        user_id: 0,
        title: "",
        created_at: new Date(),
        updated_at: new Date(),
    });
    const [post_author, setAuthor] = useState<string>("");

    const urlParams = useParams();
    const post_id: string | undefined = urlParams["threadid"];
    const getSubposts = () => {
        fetch(`http://127.0.0.1:3001/api/v1/posts/${post_id}`)
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

    // get data from DB when form is submitted / when first rendered.
    if (!show) {
        getSubposts();
    }

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
            <NewComment show={show} setShow={setShow} thread_id={post["id"]} thread_name={post["title"]} />

            <Link to="/home">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default StyledThreadView;
