export function setCookie(cookieName, cookieValue, days) {
    const expiry = new Date()
    expiry.setTime(expiry.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${cookieName}=${cookieValue}; expires=${expiry.toUTCString()}; path=/`
}