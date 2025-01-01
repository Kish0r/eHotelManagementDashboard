export type LoginDetail = {
    email: string,
    password: string
}

export type LoginResponse = {
    access_token: string
    token_type: string
    user_type: string
}

export type Users = {
    user_id: string
    name: string
    email: string
    user_type: string
}

export type PaginatedUser = {
    users: Users []
    total: number
}