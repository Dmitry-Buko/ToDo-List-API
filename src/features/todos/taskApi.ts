import { CreateTodoDto, ITodo } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-redev.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation<ITodo, CreateTodoDto>({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    editTodo: builder.mutation<ITodo, { id: number; newTitle: string }>({
      query: ({ id, newTitle }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { title: newTitle },
      }),
      invalidatesTags: ["Todo"],
    }),
    togglerTodo: builder.mutation<ITodo, number>({
      query: (id) => ({
        url: `/todos/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Todo"],
    }),
    clearCompleted: builder.mutation<void, number[]>({
      async queryFn(ids, _api, _extra, baseQuery) {
        const results = await Promise.all(
          ids.map((id) => baseQuery({ url: `/todos/${id}`, method: "DELETE" })),
        );
        const failed = results.find((r) => r.error);
        return failed?.error ? { error: failed.error } : { data: undefined };
      },
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useTogglerTodoMutation,
  useClearCompletedMutation,
} = taskApi;
