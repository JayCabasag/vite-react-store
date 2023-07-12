import closeIcon from '../../../../assets/close.svg'
import { Item } from '../../../../states/cart/types'
import { Button } from '../../../shared/Button'
import CartItemsWrapper from './CartItemsWrapper'

interface CartDrawerProps {
    items: Item[]
    showCartDrawer: boolean
    toggleCartDrawer: () => void
}


const CartDrawer = ({ items, showCartDrawer, toggleCartDrawer }: CartDrawerProps) => {

    const hasItems = items.length >= 1
    const amount = items.reduce((accumulator, item) => {
        const price = item.product.price
        const count = item.count
        return accumulator + (price * count)
    }, 0)

    return <div className={`fixed ${showCartDrawer ? 'w-full md:w-[500px]' : 'w-0'} shadow-md overflow-hidden bg-white top-0 left-auto right-0 transition-all`}>
        <div className={`${showCartDrawer ? ' flex ' : ' hidden '} h-screen w-full flex-col`}>
            <div className='w-full flex items-start p-4 border'>
                <button className='min-w-[32px] min-h-[32px]' onClick={toggleCartDrawer}>
                    <img
                        src={closeIcon}
                        height={32}
                        width={32}
                        alt="close"
                    />
                </button>
            </div>
            <CartItemsWrapper items={items} />
            <div className='w-full flex items-start p-4 border justify-between'>
                <p className='font-bold'>${amount.toFixed(2)}</p>
                <Button variant='primary' size='sm' disabled={!hasItems}>Checkout</Button>
            </div>
        </div>
    </div>
}

export default CartDrawer