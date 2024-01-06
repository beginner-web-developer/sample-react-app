export type PostFromDB = {
    data: Post[];
    username: string;
};

export type Post = {
    id: number;
    user_id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
};

export type newPost = {
    data?: Post;
    error?: string;
    status: string;
}
