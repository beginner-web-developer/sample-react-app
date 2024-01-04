export type User = {
    id: number;
    username: string;
    name: string;
    created_at: Date;
    updated_at: Date;
};

export type newUser = {
    data?: User;
    error?: string;
    status: string;
};
