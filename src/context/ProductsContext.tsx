import { ReactNode, useContext } from "react";
import { createContext } from "react";
import { Product, StatusType } from "../entities/types";
import { useState } from "react";
import { useProductsData } from "../hooks/useProductsData";

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

    const [productLimits, setProductLimits] = useState(10)
    const { products, status } = useProductsData(`https://fakestoreapi.com/products?limit=${productLimits}`, productLimits);

    const updateProductLimits = (limit: number) => {
        setProductLimits(productLimits + limit)
    }

    return (
        <ProductsContext.Provider value={{ products, status, productLimits, updateProductLimits }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default CartProvider

export const useProducts = () => useContext(ProductsContext)