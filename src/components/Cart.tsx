import { useSnapshot } from 'valtio'
import cartIcon from '../assets/bag.svg'
import { cartState } from '../states/cart/states'

export const Cart = () => {
    const cartStates = useSnapshot(cartState)
    const cartItems = cartStates.items.map((item) => item.product)
    const totalProducts = cartItems.length

    return (
        <div className='absolute left-auto right-4'>
            <div className='relative'>
                {Boolean(totalProducts) && (
                    <div className='absolute left-auto right-0 bg-white p-[2px] border px-2 rounded-full'>
                        {totalProducts}
                    </div>
                )}
                <img
                    src={cartIcon}
                    height={50}
                    width={50}
                    alt='bag'
                />
            </div>
        </div>
    )
}
