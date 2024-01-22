import NewComment from "./NewComment";
import Comment from "../types/Comment";
import { currentuser } from "../pages/Login";
import React, { useState } from "react";
import { Button, Card, CardContent, Fade, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    comment: Comment;
    styled: boolean;
};
const useStyles = makeStyles(() => ({
    commentBody: {
        fontSize: 16,
        whiteSpace: "pre-wrap",
        paddingBottom: "1em",
    },
    commentCard: {
        marginBottom: "1em",
    },
    metadata: {
        fontSize: 14,
    },
}));

const CommentItem: React.FC<Props> = ({ comment, styled }) => {
    const classes = useStyles();

    // to delete comment
    const deleteComment = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const comment_id: string = (event["target"] as HTMLButtonElement).value;
        fetch(`http://127.0.0.1:3001/api/v1/subposts/${comment_id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                const status = document.getElementById("status");
                if (status !== null) {
                    status.innerHTML = data["message"];
                    setShowError(true);
                }
            })
            .catch((error) => console.log(error));
    };

    //to edit comment
    const [comment_id, setComment_id] = useState<string>("0");
    const edit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setComment_id((event["target"] as HTMLButtonElement).value);
        setVisible(true);
    };

    // controls hiding and showing of form
    const [visible, setVisible] = useState<boolean>(false);

    // controls form submission
    const editText = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body: string = (document.getElementById("body") as HTMLInputElement).value;
        const data = {
            body,
        };
        fetch(`http://127.0.0.1:3001/api/v1/subposts/${comment_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const status: HTMLElement | null = document.getElementById("status");
                if (data["status"] === "success") {
                    if (status !== null) {
                        status.innerHTML = "Comment successfully updated";
                        setShowError(true);
                        setVisible(false);
                    }
                } else {
                    if (status !== null) {
                        status.innerHTML = data["error"];
                        setShowError(true);
                    }
                }
            })
            .catch((error) => console.log(error));
    };

    const [showError, setShowError] = useState<boolean>(false);

    if (styled) {
        return (
            <>
                <Fade in={showError} timeout={1000}>
                    <p id="status"></p>
                </Fade>
                <Card className={classes.commentCard}>
                    <CardContent>
                        <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                            {comment.subpost["body"]}
                        </Typography>
                        <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                            {"Posted by " + comment.author + " on " + comment.subpost["created_at"].toLocaleString()}
                        </Typography>
                    </CardContent>
                    <Button
                        disabled={comment.author !== currentuser["username"]}
                        id={"edit" + comment.subpost["id"]}
                        value={comment.subpost["id"]}
                        onClick={edit}
                        className="subposts"
                    >
                        {"Edit"}
                    </Button>
                    <NewComment show={visible} setShow={setVisible} formHandler={editText} name="comment" />
                    <Button
                        disabled={comment.author !== currentuser["username"]}
                        id={"delete" + comment.subpost["id"]}
                        value={comment.subpost["id"]}
                        onClick={deleteComment}
                        className="subposts"
                    >
                        {"Delete"}
                    </Button>
                </Card>
            </>
        );
    }

    // unstyled
    return (
        <li className={classes.commentBody}>
            {comment.subpost["body"]}
            <br />
            <em>{"posted by " + comment.author + " on " + comment.subpost["created_at"].toLocaleString()}</em>
        </li>
    );
};

export default CommentItem;
