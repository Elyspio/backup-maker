import { createAsyncActionGenerator } from "@store/utils/utils.actions";

const createAsyncThunk = createAsyncActionGenerator("databases/mongo");

export const getTodos = createAsyncThunk("getTodo", async (_, { extra }) => {});

export const addTodo = createAsyncThunk("addTodo", async (_, { extra }) => {});

export const deleteTodo = createAsyncThunk("deleteTodo", async (_, { extra }) => {});

export const checkTodo = createAsyncThunk("checkTodo", async (_, { extra }) => {});
