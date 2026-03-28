import { IUser } from "./user";

export interface RegisterData {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role?: string;
}

export interface AuthData {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: '<jwt>';
    user: IUser;
}