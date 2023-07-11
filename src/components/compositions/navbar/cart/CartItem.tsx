import { memo } from "react"
import { Item } from "../../../../states/cart/types"
import { Button } from "../../../shared/Button"
import { deleteItem } from "../../../../states/cart/utils"

interface CartItemProps {
    item: Item
}

const CartItem = memo(({ item }: CartItemProps) => {

    const removeItem = (itemId: string) => {
        deleteItem(itemId)
    }

    const itemAmount = item.count * item.product.price

    return (
        <div className="flex flex-row">
            <div className="h-[50px] w-[50px] rounded-md overflow-hidden">
                <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    height={50}
                    width={50}
                />
            </div>
            <div className="flex-1 flex items-start flex-col pl-2">
                <div className="flex flex-row w-full">
                    <h1 className="font-bold flex-1 text-left">{item.product.title}</h1>
                    <p className="">${itemAmount}</p>
                </div>
                <p>quantity: {item.count}</p>
                <Button className="mt-2" size='sm' variant='secondary' onClick={() => removeItem(item.id)}>Remove</Button>
            </div>
        </div>
    )
})
export default CartItem