import {StateCreator} from 'zustand';
import {StoreState} from '~/store/types';
import {UsersSlice} from '~/store/types/users';
import { CurrentUser } from "~/types/users";

export const createUsersSlice: StateCreator<
  StoreState,
  [],
  [],
  UsersSlice
> = (set) => ({
  usersState: {
    currentUser: undefined,
  },
  setCurrentUser: (user: CurrentUser) => {
    set((state) => {
      state.usersState.currentUser = user;
      return state;
    })
  }
})