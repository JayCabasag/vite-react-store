import closeIcon from '../../../../assets/close.svg'
import { Item } from '../../../../states/cart/types'
import CartItemList from './CartItemList'

interface CartDrawerProps {
    items: Item[]
    showCartDrawer: boolean
    toggleCartDrawer: () => void
}


const CartDrawer = ({ items, showCartDrawer, toggleCartDrawer }: CartDrawerProps) => {
    return <div className={`fixed ${showCartDrawer ? 'w-[500px]' : 'w-0'} shadow-md overflow-x-hidden bg-white -top-1 left-auto right-0 transition-all`}>
        <div className="w-full  flex items-baseline mt-1 ml-1 flex-col">
            <button className='min-w-[32px] min-h-[32px]' onClick={toggleCartDrawer}>
                <img
                    src={closeIcon}
                    height={32}
                    width={32}
                    alt="close"
                />
            </button>
            <CartItemList items={items} />
        </div>
    </div>
}

export default CartDrawer