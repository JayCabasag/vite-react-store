import { cartState } from "./states";
import { Item } from "./types";

export const getItem = (itemId: string): undefined | Item => {
    const item = cartState.items.find((item) => item.id === itemId)
    return item
}

export const addItem = (item: Item) => {
    const state = [...cartState.items, item]
    cartState.items = state
}

export const deleteItem = (itemId: string) => {
    const state = cartState.items.filter((item) => item.id !== itemId)
    cartState.items = state
}

export const updateItem = (updatedItem: Item) => {
    const state = cartState.items.map((item) => {
        if (item.id === updatedItem.id) {
            return updatedItem
        }
        return item
    })
    cartState.items = state
}
