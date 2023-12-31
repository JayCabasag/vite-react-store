import { useEffect, useState } from "react";
import { StatusType } from "../entities/types";
import { Province } from "../entities/types";

export function useProvincesData(url: string) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [status, setStatus] = useState<StatusType>('idle')

    useEffect(() => {
        let ignore = false;
        setStatus('loading')
        fetch(url)
            .then(response => response.json())
            .then(json => {
                if (!ignore) {
                    setProvinces(json.data);
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
    return { provinces, status }
}