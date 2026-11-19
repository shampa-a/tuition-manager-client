export type UserRole = "student" | "tutor" | "admin";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}