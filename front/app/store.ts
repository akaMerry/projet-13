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
  user: {
    createdAt: undefined | Date;
    id: undefined | string;
    firstName: undefined | string;
    lastName: undefined | string;
    email: undefined | string;
    updatedAt: undefined | Date;
  };
}

const initialState = {
  isAuthenticated: false,
  user: {
    createdAt: undefined,
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    updatedAt: undefined,
  },
} as userState;

const baseURL = "http://localhost:3001/api/v1";

export const getToken = createAsyncThunk(
  "userState/getToken",
  async (payload: {
    email: string;
    password: string;
    tokenStorage: boolean;
  }) => {
    const response = await fetch(`${baseURL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    });

    const login = await response.json();

    let token;

    if (payload.tokenStorage === true) {
      localStorage.setItem("token", login.body.token);
      token = login.body.token;
    } else {
      sessionStorage.setItem("token", login.body.token);
      token = login.body.token;
    }
  }
);

export const getUser = createAsyncThunk("userState/getUser", async () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const response = await fetch(`${baseURL}/user/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await response.json();
  const userData = user.body;

  return { userData };
});

export const updateUser = createAsyncThunk(
  "userState/updateUser",
  async (payload: { firstName: string; lastName: string }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const response = await fetch(`${baseURL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const updateUser = await response.json();

    const userData = updateUser.body;

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
