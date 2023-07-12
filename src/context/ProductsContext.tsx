import { ReactNode, useContext } from "react";
import { createContext } from "react";
import { Product, StatusType } from "./types";
import { useEffect, useState } from "react";

const ProductsContext = createContext<{ products: Product[], status: StatusType }>({ products: [], status: 'idle' })

const CartProvider = ({ children }: { children: ReactNode }) => {

    const [products, setProducts] = useState<Product[]>([])
    const [status, setStatus] = useState<StatusType>('idle')

    useEffect(() => {
        const getProducts = async () => {
            setStatus('loading')
            await fetch('https://fakestoreapi.com/products')
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

        }
        getProducts()
    }, [])

    return (
        <ProductsContext.Provider value={{ products, status }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default CartProvider

export const useProducts = () => useContext(ProductsContext)