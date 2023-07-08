import { Product } from '../context/types'
import { addItem, deleteItem, updateItem } from '../states/cart/utils'
import { Item } from '../states/cart/types'
import { v4 as uuidv4 } from 'uuid';
import { useSnapshot } from 'valtio';
import { cartState } from '../states/cart/states';
import { memo } from 'react';

export const ProductCard = memo(({ product }: { product: Product }) => {
    const cartStates = useSnapshot(cartState)
    const cartItems = cartStates.items
    const cartItem = cartItems.find((item) => {
        const itemId = item.product.id
        return itemId === product.id
    })
    const cartCount = cartItem ? cartItem.count : 0
    const showToggler = cartCount > 0

    const handleAddItem = (product: Product) => {
        const item = { product, id: uuidv4().toString(), count: 1 } as Item
        addItem(item)
    }

    const handleIncreaseItem = (product: Product) => {
        if (!cartItem?.id) return
        const item = { product, id: cartItem.id, count: cartCount + 1 } as Item
        // console.log('INcreasw', item)
        updateItem(item)
    }

    const handleDecreaseItem = (product: Product) => {
        if (!cartItem?.id) return
        const item = { product, id: cartItem.id, count: cartCount - 1 } as Item

        if (cartCount <= 1) {
            const cartItemId = cartItem ? cartItem.id : null
            if (cartItemId) {
                deleteItem(cartItemId)
            }
            return
        }

        updateItem(item)
    }

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
                    <button className='px-2 border' onClick={() => handleDecreaseItem(product)}>-</button>
                    <span className='px-2'>{cartCount}</span>
                    <button className='px-2 border' onClick={() => handleIncreaseItem(product)}>+</button>
                </>
                    :
                    <button onClick={() => handleAddItem(product)}>Add to cart</button>
                }
            </div>
        </div>
    )
}
)