export const handleApiError = (error: any) => {
    console.error('[API Error]:', error);
    const code = error.code;


    if (!error.response) {
        if (code === "ERR_NETWORK") {
            throw new Error("Ошибка. Проверьте настройки сети")
        }
        if (code === "ECONNABORTED") {
            throw new Error("Таймуат запроса. Попробуйте еще раз")
        }
        throw new Error("Ошибка сети. Проверьте подключение к интернету.");
    }

    const status = error.response.status;
    const message = error.response.data?.message || error.response.statusText;

    if (status === 404) {
        throw new Error("404 - Ошибка запроса. Адрес не найден.");
    } else if (status >= 500) {
        throw new Error("500 - Ошибка сервера. Попробуйте позже.");
    } else {
        throw new Error(`Ошибка при загрузке данных ${status}: ${message} \n ${error.response?.data.message}`);
    }
}