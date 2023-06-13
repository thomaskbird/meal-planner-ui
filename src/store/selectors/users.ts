import { StoreState } from "~/store/types";

export const selectCurrentUser = (store: StoreState) => store.usersState.currentUser;

export const selectSetCurrentUser = (store: StoreState) => store.setCurrentUser;