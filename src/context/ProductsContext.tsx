import { ReactNode, useContext } from "react";
import { createContext } from "react";
import { Product, StatusType } from "./types";
import { useEffect, useState } from "react";

const ProductsContext = createContext<{
    products: Product[],
    status: StatusType,
    productLimits: number,
    updateProductLimits: (limit: number) => void
}>({
    products: [],
    status: 'idle',
    productLimits: 0,
    updateProductLimits: () => { }
})

const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<Product[]>([])
    const [status, setStatus] = useState<StatusType>('idle')
    const [productLimits, setProductLimits] = useState(5)

    const updateProductLimits = (limit: number) => {
        setProductLimits(productLimits + limit)
    }

    useEffect(() => {
        const getProducts = async () => {
            setStatus('loading')
            if (productLimits > 5) {
                setStatus('loading-next-page')
            }
            setTimeout(async () => {
                await fetch(`https://fakestoreapi.com/products?limit=${productLimits}`)
                    .then(async (res) => {
                        const data: Product[] = await res.json()
                        setProducts(data)
                        setStatus('success')
                    })
                    .catch(() => {
                        setProducts([])
                        setStatus('failed')
                    })
                    .finally(() => {
                        setStatus('idle')
                    })

            }, 2000)
        }
        getProducts()
    }, [productLimits])

    return (
        <ProductsContext.Provider value={{ products, status, productLimits, updateProductLimits }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default CartProvider

export const useProducts = () => useContext(ProductsContext)