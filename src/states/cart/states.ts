import { proxy } from 'valtio'
import { Item } from './types'

export const cartState = proxy({ items: [] as Item[] })
