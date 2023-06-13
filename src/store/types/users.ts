import { CurrentUser } from "~/types/users";

export interface UsersSlice {
  usersState: {
    currentUser: undefined | CurrentUser | any
  },
  setCurrentUser: (user: CurrentUser) => void;
}