export interface ITodo {
  completed: boolean;
  createdAt: string;
  description: string | null;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
}

export type Filter = "all" | "active" | "completed";