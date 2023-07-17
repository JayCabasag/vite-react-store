import { useSnapshot } from "valtio"
import { Cart } from "./cart/Cart"
import { cartState } from "../../../states/cart/states"
import { useProducts } from "../../../context/ProductsContext"
import { useCallback, useState } from "react"
import CartDrawer from "./cart/CartDrawer"
import { Item } from "../../../states/cart/types"

export const Navbar = () => {
    const cartStates = useSnapshot(cartState)
    const cartItems = cartStates.items as Item[]
    const { status } = useProducts()
    const isLoading = status === 'loading'
    const cartProducts = cartItems.map((item) => item.product)
    const totalProducts = cartProducts.length

    const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false)

    const handleToggleCartDrawer = useCallback(() => {
        setShowCartDrawer(!showCartDrawer)
    }, [showCartDrawer])

    return <nav className="relative min-h-[45px] w-full py-[12px]">
        <div className="flex">
            <h1 className="text-3xl font-bold">
                Store Logo
            </h1>
            <Cart totalProducts={totalProducts} isLoading={isLoading} toggleCartDrawer={handleToggleCartDrawer} />
        </div>
        <CartDrawer items={cartItems} showCartDrawer={showCartDrawer} toggleCartDrawer={handleToggleCartDrawer} />
    </nav>
}
