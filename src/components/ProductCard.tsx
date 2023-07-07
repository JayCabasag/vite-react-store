import { useState } from 'react'
import { Product } from '../context/types'

export const ProductCard = ({ product }: { product: Product }) => {
    const [count, setCount] = useState(0)
    const showToggler = count > 0

    return (
        <div className='flex flex-col items-start'>
            <div className='border h-[150px] w-[150px] object-contain overflow-hidden flex items-center justify-center'>
                <img
                    src={product.images[0]}
                    height={150}
                    width={150}
                    alt={product.title}
                />
            </div>
            <h1 className='max-w-[120px] text-lg font-bold text-left'>{product.title}</h1>
            <p>${product.price}</p>
            <div className='mt-[15px] w-full'>
                {showToggler ? <>
                    <button className='px-2 border' onClick={() => setCount(count === 0 ? 0 : count - 1)}>-</button>
                    <span className='px-2'>{count}</span>
                    <button className='px-2 border' onClick={() => setCount(count + 1)}>+</button>
                </>
                    :
                    <button onClick={() => setCount(count + 1)}>Add to cart</button>
                }
            </div>
        </div>
    )
}
