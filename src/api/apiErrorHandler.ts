type ApiErrorMeta = {
    status?: number;
    code?: string;
    details?: unknown;
    errorMessage?: string;
    originalMessage?: unknown;
};

export class ApiError extends Error {
    status?: number;
    code?: string;
    details?: unknown;
    errorMessage?: string;
    originalMessage?: unknown;

    constructor(message: string, data: ApiErrorMeta = {}) {
        super(message)
        this.status = data.status
        this.code = data.code
        this.details = data.details
        this.errorMessage = data.errorMessage
        this.originalMessage = data.originalMessage
    }
}

export const handleApiError = (error: any) => {
    console.error('[API Error]:', error);
    const code = error.code;

    if (!error.response) {
        if (code === "ERR_NETWORK") {
            // throw new Error("Ошибка. Проверьте настройки сети")
            throw new ApiError("Ошибка. Проверьте настройки сети", {
                code,
                originalMessage: error
            })
        }
        if (code === "ECONNABORTED") {
            // throw new Error("Таймуат запроса. Попробуйте еще раз")
            throw new ApiError("Таймуат запроса. Попробуйте еще раз", {
                code,
                originalMessage: error
            })
        }

        if (code === 'ERR_BAD_REQUEST') {
            throw new ApiError("Проверьте запрос. Попробуйте еще раз", {
                code,
                originalMessage: error
            })
        }

        throw new ApiError("Ошибка сети. Проверьте подключение к интернету.");

    }

    const status = error.response.status;
    const details = error.response.data;
    const message = error.response.data?.message || error.response.statusText;

    if (status === 404) {
        throw new ApiError("404 - Ошибка запроса. Адрес не найден.", {
            code,
            status,
            details,
            originalMessage: error
        });

    } else if (status >= 500) {
        throw new ApiError(`${status} - Ошибка сервера. Попробуйте позже.`, {
            code,
            status,
            details,
            originalMessage: error
        });
    } else {
        throw new ApiError(`Ошибка при загрузке данных ${status}: ${message}`, {
            status,
            code,
            details,
            errorMessage: message,
            originalMessage: error,
        });
    }
}