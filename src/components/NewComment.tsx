import { Button, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";

type Props = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    formHandler: (event: React.FormEvent<HTMLFormElement>) => void;
    name: string;
};

const NewComment: React.FC<Props> = ({ show, setShow, formHandler, name }: Props) => {
    // event handler for updating input field value
    const [value, setValue] = useState("");
    const UpdateText = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value);
    };

    // controls the hiding and showing of the form
    if (show) {
        return (
            <>
                <h1 id="createCommentMessage">{`Enter new ${name}.`}</h1>
                <form
                    onSubmit={(event) => {
                        formHandler(event);
                        setValue("");
                    }}
                >
                    <InputLabel htmlFor="post">{"Comment"}</InputLabel>
                    <Input id="body" value={value} onChange={UpdateText} />
                    <Button type="submit">{"Post"}</Button>
                </form>
                <Button onClick={() => setShow(false)}>{"Cancel"}</Button>
            </>
        );
    } else {
        return <></>;
    }
};

export default NewComment;
