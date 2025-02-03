import { API_URL } from '@env';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';


interface RegisterState {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  loading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  name: '',
  email: '',
  password: '',
  role: '',
  phone: '',
  loading: false,
  error: null,
};    


export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: { name: string; email: string; password: string; role: string; phone: string }, thunkAPI) => {
      try {
        const URL=`${API_URL}/lms/auth/register`;
        const response = await axios.post(URL, userData);
        return response.data;
      } catch (error: any) {
        console.error("Register Error",error.response);
        if (error.response ==="Network Error") {
          Alert.alert('Network Error', 'Server Down.');
          console.log('Network Error', 'Please check your internet connection.');
          return thunkAPI.rejectWithValue('Network Error');
        }
        return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );;

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log('Register pending');        
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('Register fulfilled');        
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.role = action.payload.role;
        state.phone = action.payload.phone;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('Register rejected');        
        state.loading = false;
        console.warn("Error",action.payload as string);
        state.error = action.payload as string;
      });
  },
});

export default registerSlice.reducer;
