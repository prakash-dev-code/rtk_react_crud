import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataType } from "../types/common";
import { loadUsers, saveUsers } from "../utils/localStorage";

interface UserState {
  users: DataType[];
}

const initialState: UserState = {
  users: loadUsers(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<DataType>) => {
      state.users.push(action.payload);
      saveUsers(state.users);
    },
    updateUser: (state, action: PayloadAction<DataType>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
        saveUsers(state.users); 
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      saveUsers(state.users);
    },
    clearUsers: (state) => {
      state.users = [];
      clearUsers();
    },
  },
});

export const { addUser, updateUser, deleteUser, clearUsers } =
  userSlice.actions;
export default userSlice.reducer;
