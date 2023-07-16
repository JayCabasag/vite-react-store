import { useEffect, useState } from "react";
import { Barangay, StatusType } from "../entities/types";

export function useBarangaysData(url: string) {
    const [cities, setCities] = useState<Barangay[]>([]);
    const [status, setStatus] = useState<StatusType>('idle')

    useEffect(() => {
        let ignore = false;
        setStatus('loading')
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setCities(json.data);
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
    return { cities, status }
}