import { Item } from '../../../../states/cart/types'
import CartItem from './CartItem'


interface CartItemsWrapperProps {
    items: Item[]
}

const CartItemsWrapper = ({ items }: CartItemsWrapperProps) => {
    const hasItems = items.length >= 1
    return (
        <div className='flex flex-col w-full p-4 gap-4 overflow-auto'>
            {!hasItems && 'No items in cart.'}
            {hasItems && items.map((item: Item) => {
                return <CartItem key={item.id} item={item} />
            })}
        </div>
    )
}

export default CartItemsWrapper 