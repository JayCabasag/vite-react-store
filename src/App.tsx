import './App.css'
import { Product } from './context/types'
import { ProductCard } from './components/ProductCard'
import { useProducts } from './context/ProductsContext'
import { Cart } from './components/Cart'
import { useSnapshot } from 'valtio'
import { cartState } from './states/cart/states'
import { v4 as uuidv4 } from 'uuid'
import { addItem, deleteItem, updateItem } from './states/cart/utils'
import { Item } from './states/cart/types'
import { useCallback } from 'react'

function App() {
  const cartStates = useSnapshot(cartState)

  const cartItems = cartStates.items
  const { products, status } = useProducts()
  const isLoading = status === 'loading'

  const handleAddItem = useCallback((product: Product) => {
    const item = { product, id: uuidv4().toString(), count: 1 } as Item
    addItem(item)
  }, [],)


  const handleIncreaseItem = useCallback((product: Product, count: number, cartItemId: string) => {
    if (!cartItemId) return
    const item = { product, id: cartItemId, count: count + 1 } as Item
    updateItem(item)
  }, [])


  const handleDecreaseItem = useCallback((product: Product, count: number, cartItemId: string) => {
    if (!cartItemId) return
    const item = { product, id: cartItemId, count: count - 1 } as Item

    if (count <= 1) {
      deleteItem(cartItemId)
      return
    }

    updateItem(item)
  }, [])


  return (
    <main className='relative'>
      <Cart />
      <h1 className="text-3xl font-bold">
        Store
      </h1>
      {JSON.stringify(cartStates.items)}
      <div className='mt-[40px] flex  gap-6 flex-wrap items-center justify-center min-h-[200px]'>
        {isLoading && (
          'Please wait...'
        )}
        {!isLoading && products.map((product: Product) => {

          const cartItem = cartItems.find((item) => {
            const itemId = item.product.id
            return itemId === product.id
          }) as Item

          return (
            <ProductCard
              key={product.id}
              product={product}
              item={cartItem}
              handleAddItem={handleAddItem}
              handleIncreaseItem={handleIncreaseItem}
              handleDecreaseItem={handleDecreaseItem}
            />
          )

        })}
      </div>
    </main>
  )
}

export default App
