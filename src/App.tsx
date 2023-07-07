import './App.css'
import { Product } from './context/types'
import { ProductCard } from './components/ProductCard'
import { useProducts } from './context/ProductsContext'
import { Cart } from './components/Cart'

function App() {
  const { products, status } = useProducts()
  const isLoading = status === 'loading'
  return (
    <main className='relative'>
      <Cart />
      <h1 className="text-3xl font-bold">
        Store
      </h1>
      <div className='mt-[40px] flex  gap-6 flex-wrap items-center justify-center min-h-[200px]'>
        {isLoading && (
          'Please wait...'
        )}
        {!isLoading && products.map((product: Product) => {
          return <ProductCard
            product={product}
            key={product.id}
          />
        })}
      </div>
    </main>
  )
}

export default App
