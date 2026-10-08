export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  gender: string;
  age: number;
}

export interface AuthResponse {
  access_token: string;
}

export interface ITodo {
  completed: boolean;
  createdAt: string;
  description: string | null;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface PaginatedTodos {
  data: ITodo[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateTodoDto {
  title: string;
  description?: string;
}

export type Filter = "all" | "active" | "completed";