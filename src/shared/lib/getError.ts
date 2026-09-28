import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined,
): string | undefined {
  if (!error) return;
  if ("status" in error) {
    const data = error.data as { message?: string | string[] } | undefined;
    return Array.isArray(data?.message)
      ? data.message[0]
      : (data?.message ?? "Ошибка запроса");
  }
  return error.message;
}
