import { useEffect, useState } from "react";
import { Product, StatusType } from "../context/types";

export function useProductsData(url: string, limit: number) {
    const [products, setProducts] = useState<Product[]>([]);
    const [status, setStatus] = useState<StatusType>('idle')

    useEffect(() => {
        let ignore = false;
        setStatus('loading')
        if (limit > 10) {
            setStatus('loading-next-page')
        }
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setProducts(json);
                    setStatus('success')
                }
            }).catch(() => {
                setStatus('failed')
            }).finally(() => {
                setStatus('idle')
            })
        return () => {
            ignore = true;
        };
    }, [url]);
    return { products, status }
}