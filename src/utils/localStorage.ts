import { DataType } from "../types/common";

export const loadUsers = (): DataType[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: DataType[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};
