export interface UserDataResult{
    id: number;
    userName: string;
    name: string;
    password: string;
    role: number;
}

export interface LoginJSON{
    userId: number;
    userName: string;
    role: number;
}

export interface LoginResponse {
    jwt: string | null;
}