import { proxy } from "valtio";
import { User } from './types'


export const userState = proxy({
    user: {} as User
})
