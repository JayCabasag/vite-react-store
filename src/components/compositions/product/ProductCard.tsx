import { Product } from '../../../context/types'
import { Item } from '../../../states/cart/types'
import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { addItem, deleteItem, updateItem } from '../../../states/cart/utils';

interface ProductCardProps {
    count: number,
    product: Product,
    item?: Item,
}

export const ProductCard = memo(({ count, product, item }: ProductCardProps) => {

    const showToggler = Boolean(item?.count)
    const cartItemId = item ? item.id : ''

    const handleAddItem = (product: Product) => {
        const item = { product, id: uuidv4().toString(), count: 1 } as Item
        addItem(item)
    }


    const handleIncreaseItem = () => {
        if (!cartItemId) return
        const item = { product, id: cartItemId, count: count + 1 } as Item
        updateItem(item)
    }


    const handleDecreaseItem = () => {
        if (!cartItemId) return

        const item = { product, id: cartItemId, count: count - 1 } as Item

        if (count <= 1) {
            deleteItem(cartItemId)
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
                    <button className='px-2 border' onClick={() => handleDecreaseItem()}>-</button>
                    <span className='px-2'>{count}</span>
                    <button className='px-2 border' onClick={() => handleIncreaseItem()}>+</button>
                </>
                    :
                    <button onClick={() => handleAddItem(product)}>Add to cart</button>
                }
            </div>
        </div>
    )
})