export interface User {
    id: number;
    email: string;
    name: string;
}
  
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}