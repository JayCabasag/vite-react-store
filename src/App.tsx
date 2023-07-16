import './App.css'
import { Product } from './entities/types'
import { ProductCard } from './components/compositions/product/ProductCard'
import { useProducts } from './context/ProductsContext'
import { useSnapshot } from 'valtio'
import { cartState } from './states/cart/states'
import { Item } from './states/cart/types'
import { Navbar } from './components/compositions/navbar'
import storeBanner from '../src/assets/store-banner.jpg'
import { useEffect, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'

function App() {
  const cartStates = useSnapshot(cartState)
  const cartItems = cartStates.items
  const { products, status, updateProductLimits } = useProducts()

  const lastProductRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastProductRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting) updateProductLimits(10)
  }, [entry])


  const _products = products.flatMap(product => product)

  return (
    <main className='relative'>
      <Navbar />
      <h1 className="text-3xl font-bold">
        Store
      </h1>
      <div className='h-[110px] md:h-[300px] w-full shadow-md mt-6 overflow-hidden transition-all'>
        <img
          src={storeBanner}
          height={300}
          loading='lazy'
          width='100%'
        />
      </div>
      <div className='mt-[40px] flex gap-2 md:gap-6 flex-wrap items-center justify-center min-h-[150px]  md:min-h-[200px]'>
        {status === 'loading' && 'Please wait...'}
        {!(status === 'loading') && _products.map((product: Product, index: number) => {

          const cartItem = cartItems.find((item) => {
            const itemId = item.product.id
            return itemId === product.id
          }) as Item

          const count = cartItem ? cartItem.count : 0

          const isLastProduct = index + 1 === _products.length

          if (isLastProduct) {
            return (
              <div ref={ref} key={product.id}>
                <ProductCard
                  count={count}
                  product={product}
                  item={cartItem}
                />
              </div>
            )
          }

          return (
            <div key={product.id}>
              <ProductCard
                count={count}
                product={product}
                item={cartItem}
              />
            </div>
          )
        })}
      </div>
      {status === 'loading-next-page' && (
        <div className='min-h-[250px] flex items-center justify-center'>
          Please wait...
        </div>
      )}
      {/* {!(status === 'loading' || status === 'loading-next-page') && (
        <button className='px-4 p-2 bg-blue-500 mt-10 text-white font-bold' onClick={() => updateProductLimits(5)}>Load more</button>
      )} */}
    </main>
  )
}

export default App
