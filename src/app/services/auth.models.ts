// auth.models.ts
export interface User {
    id: number;
    username: string;
    role: string; // Add the role property
  }
  
  export interface LoginResponse {
    [x: string]: any;
    token: string;
    user: User;
  }
  