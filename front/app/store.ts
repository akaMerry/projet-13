import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
type RootState = ReturnType<typeof userStore.getState>;
type AppDispatch = typeof userStore.dispatch;

import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

interface userState {
  isAuthenticated: boolean;
  token: null | string;
  user: {
    createdAt: null | Date;
    id: null | string;
    firstName: null | string;
    lastName: null | string;
    email: null | string;
    updatedAt: null | Date;
  };
}

const initialState = {
  isAuthenticated: false,
  token: null,
  user: {
    createdAt: null,
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    updatedAt: null,
  },
} as userState;

const baseURL = "http://localhost:3001/api/v1";

export const getUser = createAsyncThunk(
  "userState/getUser",
  async (payload: { email: string; password: string }) => {
    const login = await fetch(`${baseURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());

    const token = login.body.token;

    const userProfile = await fetch(`${baseURL}/user/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
    const userData = userProfile.body;

    return { token, userData };
  }
);

export const updateUser = createAsyncThunk(
  "userState/updateUser",
  async (
    payload: {
      firstName: string;
      lastName: string;
    },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as { user: userState };
    const token = state.user.token;

    await fetch(`${baseURL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }).then((response) => response.json());

    const userProfile = await fetch(`${baseURL}/user/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());

    const userData = userProfile.body;

    return { userData };
  }
);

export const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.userData;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.userData;
    });
  },
});

export const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const { logout } = userSlice.actions;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
