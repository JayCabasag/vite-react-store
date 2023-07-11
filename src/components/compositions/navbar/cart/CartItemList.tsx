import { Item } from '../../../../states/cart/types'


interface CartItemListProps {
    items: Item[]
}

const CartItemList = ({ items }: CartItemListProps) => {
    return (
        <div className='  h-screen overflow-scroll'>{JSON.stringify(items)}</div>
    )
}

export default CartItemList