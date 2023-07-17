import cartIcon from '../../../../assets/bag.svg'
import Loading from '../../../shared/Loading/Loading'

interface CartProps {
    totalProducts: number
    isLoading: boolean
    toggleCartDrawer: () => void
}

export const Cart = ({ totalProducts, isLoading, toggleCartDrawer }: CartProps) => {
    return (
        <button className='absolute left-auto right-4' onClick={toggleCartDrawer}>
            {isLoading ? <Loading /> : (
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
                        loading='lazy'
                        alt='bag'
                    />
                </div>
            )}
        </button>
    )
}
