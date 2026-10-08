# ToDo List — React + TypeScript + RTK

ToDo-приложение с авторизацией и хранением задач на бэкенде. Проект выполнен в рамках практики по типизации Redux Toolkit и RTK Query.

🔗 **Demo:** `https://dmitry-buko.github.io/ToDo-List-API/`
📦 **API:** `https://todo-redev.onrender.com/api`

## Стек

- React 18 + TypeScript
- Vite
- Redux Toolkit (slices, `createAsyncThunk`)
- RTK Query (кэш и мутации для задач)
- React Router
- MUI (Material UI)
- Axios (клиент для auth-запросов)

## Запуск локально

```bash
npm install
npm run dev
```

Проверка типов:

```bash
npm run typecheck
```

Сборка:

```bash
npm run build
```

## Состояние приложения: Redux vs RTK Query cache

Проект сознательно разделяет два разных вида состояния — это требование задания, и решение здесь не формальное: эти данные *действительно* разной природы.

### Redux (`createSlice` + `createAsyncThunk`)

| Slice | Хранит | Почему здесь, а не в RTK Query |
|---|---|---|
| `features/auth/authSlice.ts` | `token`, `status` (`idle \| loading \| failed`), `error` | Это состояние сессии клиента: логин/логаут, персист токена в `localStorage`. Сервер не отдаёт это как «ресурс», которым можно управлять через кэш-инвалидацию — им управляет сам фронтенд. |
| `todo/store/taskSlice.ts` | `filter` (`all \| active \| completed`) | Чисто UI-состояние, существует только на клиенте и никогда не ходит на сервер. |

`login` и `register` реализованы через `createAsyncThunk` с типизированным `rejectValue`, что даёт строго типизированный `action.payload` в `rejected`-кейсе без `any`.

### RTK Query cache (`features/todos/taskApi.ts`)

Хранит список задач (`getTodos`) — это ровно кэш серверных данных, а не состояние, которым управляет клиент:

- `getTodos` — `providesTags: ["Todo"]`
- `addTodo`, `editTodo`, `deleteTodo`, `togglerTodo`, `clearCompleted` — `invalidatesTags: ["Todo"]`

После любой мутации RTK Query сам инициирует рефетч списка — компонентам не нужно вручную диспатчить обновление или держать локальную копию задач.

Ответ `/todos` на бэкенде пагинирован (`{ data: ITodo[], meta: {...} }`), поэтому `getTodos` использует `transformResponse`, чтобы остальной код работал с чистым `ITodo[]`, не зная о форме пагинации.

## Структура проекта

```
src/
  app/            — store, typed hooks, корневой компонент
  features/
    auth/         — authSlice, axios-клиент, PrivateRoute
    todos/        — taskApi (RTK Query)
  todo/           — компоненты и slice фильтра ToDo-списка
  pages/          — страницы роутинга (Login, Register, ToDo)
  shared/         — переиспользуемые UI-компоненты и утилиты
  types/          — общие типы (ITodo, DTO, Filter)
```

## Типизация

- Полностью строгий режим (`"strict": true`), `allowJs` отключён — в проекте нет JS-файлов, только `.ts`/`.tsx`.
- Нигде не используется `any`: ошибки RTK Query обрабатываются через типизированный `FetchBaseQueryError | SerializedError` (`shared/lib/getError.ts`), ошибки axios — через `isAxiosError`.
- `RootState`/`AppDispatch` выведены из стора (`ReturnType`/`typeof`), а не описаны руками — при добавлении нового slice типы обновляются автоматически.