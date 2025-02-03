import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  usertype: string | null;
}

const initialState: UserState = {
  usertype: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<string>) => {
      state.usertype = action.payload;
    },
   
  },
});

export const { setUserType } = UserSlice.actions; // Removed `getUserType` as it's not needed
export default UserSlice.reducer;
