import './App.css'
import { Product } from './context/types'
import { ProductCard } from './components/compositions/product/ProductCard'
import { useProducts } from './context/ProductsContext'
import { useSnapshot } from 'valtio'
import { cartState } from './states/cart/states'
import { Item } from './states/cart/types'
import { Navbar } from './components/compositions/navbar'
import storeBanner from '../src/assets/store-banner.jpg'

function App() {
  const cartStates = useSnapshot(cartState)
  const cartItems = cartStates.items
  const { products, status } = useProducts()
  const isLoading = status === 'loading'

  return (
    <main className='relative'>
      <Navbar />
      <h1 className="text-3xl font-bold">
        Store
      </h1>
      <div className='h-[110px] md:h-[300px] w-full shadow-md mt-6 overflow-hidden'>
        <img
          src={storeBanner}
          height={300}
          width='100%'
        />
      </div>
      <div className='mt-[40px] flex gap-2 md:gap-6 flex-wrap items-center justify-center min-h-[150px]  md:min-h-[200px]'>
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
