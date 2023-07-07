import cartIcon from '../assets/bag.svg'

export const Cart = () => {

    const totalProducts = 0

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
