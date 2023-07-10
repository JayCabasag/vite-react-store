import './App.css'
import { Product } from './context/types'
import { ProductCard } from './components/compositions/product/ProductCard'
import { useProducts } from './context/ProductsContext'
import { Cart } from './components/compositions/cart/Cart'
import { useSnapshot } from 'valtio'
import { cartState } from './states/cart/states'
import { Item } from './states/cart/types'
import { Button } from './components/shared/Button'

function App() {
  const cartStates = useSnapshot(cartState)

  const cartItems = cartStates.items
  const { products, status } = useProducts()
  const isLoading = status === 'loading'
  const cartProducts = cartItems.map((item) => item.product)
  const totalProducts = cartProducts.length

  return (
    <main className='relative'>
      <Cart totalProducts={totalProducts} />
      <h1 className="text-3xl font-bold">
        Store
      </h1>
      <Button
        variant='primary'
        type='submit'
        size='sm'
        className='text-[16px]'
      >
        Checkout
      </Button>
      <div className='mt-[40px] flex  gap-6 flex-wrap items-center justify-center min-h-[200px]'>
        {isLoading && (
          'Please wait...'
        )}
        {!isLoading && products.map((product: Product) => {

          const cartItem = cartItems.find((item) => {
            const itemId = item.product.id
            return itemId === product.id
          }) as Item

          const count = cartItem ? cartItem.count : 0

          return (
            <ProductCard
              key={product.id}
              count={count}
              product={product}
              item={cartItem}
            />
          )

        })}
      </div>
    </main>
  )
}

export default App
