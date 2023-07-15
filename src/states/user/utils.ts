import { userState } from "./states";
import { User } from "./types";

export const addUser = (user: User) => {
    userState.user = user
}

export const updateUser = (user: User) => {
    userState.user = user
}

export const deleteUser = () => {
    userState.user = {} as User
}