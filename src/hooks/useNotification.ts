import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const MESSAGE: Record<string, string> = {
    isAuthorized: 'Вы уже авторизованы'
}

const useNotification = () => {
    // State
    const [message, setMessage] = useState<string | null>(null)
    const searchParams = useSearchParams();

    const router = useRouter();


    useEffect(() => {
        const reason = searchParams.get('reason');
        if (reason && MESSAGE[reason]) {
            setMessage(MESSAGE[reason])
        }

        const params = new URLSearchParams(searchParams.toString())
        params.delete('reason')
        const newUrl = params.size ? `?${params}` : window.location.pathname
        router.replace(newUrl, { scroll: false })
    }, [searchParams])



    const clear = useCallback(() => {
        setMessage(null)
    }, [])

    return { message, clear }
}



export default useNotification;