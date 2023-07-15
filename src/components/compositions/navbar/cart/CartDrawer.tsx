import { useSnapshot } from 'valtio'
import closeIcon from '../../../../assets/close.svg'
import { Item } from '../../../../states/cart/types'
import { Button } from '../../../shared/Button'
import CartItemsWrapper from './CartItemsWrapper'
import { userState } from '../../../../states/user/states'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

interface CartDrawerProps {
    items: Item[]
    showCartDrawer: boolean
    toggleCartDrawer: () => void
}


function CartDrawer({ items, showCartDrawer, toggleCartDrawer }: CartDrawerProps) {
    const userStates = useSnapshot(userState)
    const { user } = userStates

    const [open, setOpen] = useState(false)

    const handleCheckout = () => {
        console.log(user)
        if (JSON.stringify(user) === "{}") {
            return setOpen(true)
        }
    }

    const hasItems = items.length >= 1

    const amount = items.reduce((accumulator, item) => {
        const price = item.product.price
        const count = item.count
        return accumulator + (price * count)
    }, 0)
    return <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className={`fixed ${showCartDrawer ? 'w-full md:w-[500px]' : 'w-0'} shadow-md overflow-hidden bg-white top-0 left-auto right-0 transition-all`}>
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
                    <Button variant='primary' size='sm' disabled={!hasItems} onClick={handleCheckout}>Checkout</Button>
                </div>
            </div>
        </div>
        <Dialog.Portal>
            <Dialog.Overlay className="fixed delay-200 h-screen inset-0 backdrop-blur-md bg-white/30 transition-all duration-100" />
            <Dialog.Content className="bg-white fixed rounded-md p-[25px] max-w-full h-full md:h-auto md:max-w-[500px] w-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <Cross2Icon className='h-6 w-6' />
                    </button>
                </Dialog.Close>
                <UserFormFields />
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
}

export default CartDrawer

function UserFormFields() {

    return (
        <div>
            <form className='flex flex-col gap-2'>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Fullname" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aptNumber">
                        House No./Apartment No.
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="aptNumber" type="text" placeholder="Apartment no./House no." />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                        Street
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="street" type="text" placeholder="Fullname" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barangay">
                        Barangay
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="barangay" type="text" placeholder="Fullname" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        City
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" placeholder="Fullname" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                        Contact Number
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactNumber" type="text" placeholder="Fullname" />
                </div>
                <Button variant='primary' size='md' onClick={() => { }}>Continue</Button>
                <Button className='hover:text-red-500 hover:border-red-500' variant='secondary' size='md'>Cancel</Button>
            </form>
        </div>
    )
}
