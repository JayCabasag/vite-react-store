import { Product } from '../context/types'
import { Item } from '../states/cart/types'
import { memo } from 'react';

interface ProductCardProps {
    product: Product,
    item?: Item,
    handleAddItem: (product: Product) => void
    handleIncreaseItem: (product: Product, count: number, cartItemId: string) => void
    handleDecreaseItem: (product: Product, count: number, cartItemId: string) => void
}

export const ProductCard = memo(({ product, item, handleAddItem, handleIncreaseItem, handleDecreaseItem }: ProductCardProps) => {

    const showToggler = Boolean(item?.count)
    const count = item ? item.count : 0
    const cartItemId = item ? item.id : ''

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
                    <button className='px-2 border' onClick={() => handleDecreaseItem(product, count, cartItemId)}>-</button>
                    <span className='px-2'>{count}</span>
                    <button className='px-2 border' onClick={() => handleIncreaseItem(product, count, cartItemId)}>+</button>
                </>
                    :
                    <button onClick={() => handleAddItem(product)}>Add to cart</button>
                }
            </div>
        </div>
    )
})