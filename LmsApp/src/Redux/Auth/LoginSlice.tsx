import { API_URL } from "@env";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
interface LoginState {
  email: string;
  password: string;
  role:string;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: LoginState = {
  email: "",
  password: "",
  role:"",
  loading: false,
  error: null,
  token: null,
};

export const LoginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: { email: string; password: string,role:string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/lms/auth/login`, userData);
      console.log("Login Response: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Login Error", error.response);
      if (error.message === "Network Error") {
        Alert.alert("Network Error", "Server Down. Please check your internet connection.");
        return thunkAPI.rejectWithValue("Network Error");
      }
      return thunkAPI.rejectWithValue(error.response?.data?.msg || "Something went wrong");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.email = "";
      state.password = "";
      state.role="";
      state.loading = false;
      state.error = null;
      try {
        AsyncStorage.removeItem("isLoggedIn");
        AsyncStorage.removeItem("token");
      } catch (error:any) {
        console.error("Logout Error", error.message);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        console.log("Login pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
        console.log("Login successful");
        state.loading = false;
        state.token = action.payload.token;
        try {
          AsyncStorage.setItem("isLoggedIn",JSON.stringify(true));
          AsyncStorage.setItem("token",action.payload.token);
        } catch (error:any) {
          console.error("Login ExtreReducers",error.message);
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        console.log("Login failed");
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;