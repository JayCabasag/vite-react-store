import { Product } from '../../../context/types'
import { Item } from '../../../states/cart/types'
import { memo } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { addItem, deleteItem, updateItem } from '../../../states/cart/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../../shared/Button';
import cartIcon from '../../../assets/cart.svg'
import cartIconWhite from '../../../assets/cart-white.svg'

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
        <Dialog.Root>
            <div className='flex flex-col items-start shadow-md p-4 border rounded-md'>
                <Dialog.Trigger asChild>
                    <div className='border h-[150px] w-[120px] md:w-[150px] object-contain overflow-hidden flex items-center justify-center' role='button'>
                        <img
                            src={product.image}
                            height={150}
                            width={150}
                            alt={product.title}
                        />

                    </div>
                </Dialog.Trigger>
                <h1 className='max-w-[120px] md:max-w-[150px] text-md font-bold text-left truncate'>{product.title}</h1>
                <p>${product.price}</p>
                <div className='mt-[15px] w-full'>
                    {showToggler ? <>
                        <button className='px-2 border' onClick={() => handleDecreaseItem()}>-</button>
                        <span className='px-2'>{count}</span>
                        <button className='px-2 border' onClick={() => handleIncreaseItem()}>+</button>
                    </>
                        :
                        <button className='px-4 border rounded-md flex items-center justify-center gap-2' onClick={() => handleAddItem(product)}>
                            <span>
                                <img
                                    src={cartIcon}
                                    height={24}
                                    width={24}
                                />
                            </span>
                            Add to cart</button>
                    }
                </div>
            </div>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed opacity-80 delay-200 h-screen inset-0 backdrop-blur bg-black/50 transition-all duration-100" />
                <Dialog.Content className="bg-white fixed rounded-md p-[25px] max-w-full h-full md:h-auto md:max-w-[750px] w-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon className='h-6 w-6' />
                        </button>
                    </Dialog.Close>
                    <div className='flex'>
                        <img
                            src={product.image}
                            className='w-[150px] md:w-[250px] h-[150px] md:h-[250px]'
                        />
                        <div className='pl-4'>
                            <Dialog.Title className='font-bold text-xl'>
                                {product.title}
                            </Dialog.Title>
                            <Dialog.Description className='mt-4'>
                                {product.description}
                            </Dialog.Description>
                            <Dialog.Description className='mt-4 font-bold text-md'>
                                ${product.price}
                            </Dialog.Description>
                            {showToggler ? (
                                <div className='mt-4'>
                                    <button className='px-3 py-[7px] border' onClick={() => handleDecreaseItem()}>-</button>
                                    <span className='px-3 py-[7px] '>{count}</span>
                                    <button className='px-3 py-[7px] border' onClick={() => handleIncreaseItem()}>+</button>
                                </div>
                            )
                                :
                                <Button className='mt-4 flex gap-2 text-white' variant='primary' size='md' onClick={() => handleAddItem(product)}>
                                    <span>
                                        <img
                                            src={cartIconWhite}
                                            height={24}
                                            width={24}
                                        />
                                    </span>
                                    Add to cart
                                </Button>
                            }
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
})