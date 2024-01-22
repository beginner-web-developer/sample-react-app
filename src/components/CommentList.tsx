import CommentItem from "./CommentItem";
import Comment from "../types/Comment";
import { subposts, subposts_authors } from "../pages/StyledThreadView";
import React from "react";

type Props = {
    styled: boolean;
};

const BasicCommentList: React.FC<Props> = ({ styled }: Props) => {
    return (
        <ul>
            {subposts.map((subpost, index) => {
                const comment: Comment = {
                    subpost: subpost,
                    author: subposts_authors[index],
                };
                return <CommentItem comment={comment} styled={styled} key={index} />;
            })}
        </ul>
    );
};

export default BasicCommentList;
