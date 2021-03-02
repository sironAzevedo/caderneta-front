export interface Credenciais {
    email: string;
    password: string;
}

export interface LocalUser {
    token?: string;
    email: string;
}

export interface AuthResponse {
    token: string;
}