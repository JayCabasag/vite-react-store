import { useSnapshot } from 'valtio'
import closeIcon from '../../../../assets/close.svg'
import { Item } from '../../../../states/cart/types'
import { Button } from '../../../shared/Button'
import CartItemsWrapper from './CartItemsWrapper'
import { userState } from '../../../../states/user/states'
import { FormEvent, useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import Select from '../../../shared/Select/Select'
import { useProvincesData } from '../../../../hooks/useProvinceData'
import { City, Province } from '../../../../entities/types'
import { useCitiesData } from '../../../../hooks/useCitiesData'

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
        <div className={`fixed ${showCartDrawer ? 'w-full md:w-[500px]' : 'w-0'} shadow-md overflow-hidden bg-white top-0 left-auto right-0 transition-all `}>
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
            <Dialog.Overlay className="fixed delay-200 h-screen inset-0 backdrop-blur-md bg-white/30 transition-all duration-100 overflow-auto border" />
            <Dialog.Content className="bg-white fixed rounded-md p-[25px] max-w-full overflow-auto h-screen md:h-auto md:max-w-[500px] w-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
    const { provinces } = useProvincesData('https://ph-locations-api.buonzz.com/v1/provinces')
    const { cities } = useCitiesData('https://ph-locations-api.buonzz.com/v1/cities')

    const [selectedProvince, setSelectedProvince] = useState<string>('')
    const [selectedCity, setSelectedCity] = useState<string>('')

    const _provinces: Record<string, string> = provinces.reduce((accumulator: Record<string, string>, province: Province) => {
        const name = province.name as string
        const value = province.name as string
        return { ...accumulator, [name]: value }
    }, {} as Record<string, string>)

    const selectedProvinceData = useMemo(() => provinces.find(p => p.name === selectedProvince), [provinces, selectedProvince]);

    const _cities: Record<string, string> = cities.reduce((accumulator: Record<string, string>, city: City) => {
        const name = city.name as string
        const value = city.name as string
        const isSameProvinceCode = city.province_code === selectedProvinceData?.id
        if (isSameProvinceCode) {
            return { ...accumulator, [name]: value }
        }
        return accumulator
    }, {} as Record<string, string>)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.currentTarget))
        const newData = { ...data, province: selectedProvince, city: selectedCity } as typeof data & { province: string, city: string }
        console.log(newData)
    }

    return (
        <div>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Fullname
                    </label>
                    <input className="border  px-4 rounded py-2 w-full focus:outline-none" name="username" type="text" placeholder="Fullname" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aptNumber">
                        House No./Apartment No.
                    </label>
                    <input className="border  px-4 rounded py-2 w-full focus:outline-none" name="aptNumber" type="text" placeholder="Apartment no./House no." />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                        Street
                    </label>
                    <input className="border  px-4 rounded py-2 w-full focus:outline-none" name="street" type="text" placeholder="Street" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        Province
                    </label>
                    <Select key={selectedProvince} options={_provinces} onSelectOption={(option) => {
                        setSelectedCity('')
                        setSelectedProvince(option)
                    }} value={selectedProvince} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        City
                    </label>
                    <Select key={selectedCity} options={_cities} onSelectOption={(option) => {
                        setSelectedCity(option)
                    }} value={selectedCity} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="barangay">
                        Barangay
                    </label>
                    <input className="border  px-4 rounded py-2 w-full focus:outline-none" name="barangay" type="text" placeholder="Barangay" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                        Contact Number
                    </label>
                    <input className="border  px-4 rounded py-2 w-full focus:outline-none" name="contactNumber" type="text" placeholder="Contact number" />
                </div>
                <Button variant='primary' size='md'>Continue</Button>
                <Button type='button' className='hover:text-red-500 hover:border-red-500' variant='secondary' size='md'>Cancel</Button>
            </form>
        </div>
    )
}
