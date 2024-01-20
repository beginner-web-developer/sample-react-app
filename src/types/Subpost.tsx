export type Subpost = {
    id: number;
    user_id: number;
    post_id: number;
    body: string;
    created_at: Date;
    updated_at: Date;
};

export type newSubpost = {
    data?: Subpost;
    error?: string;
    status: string;
};