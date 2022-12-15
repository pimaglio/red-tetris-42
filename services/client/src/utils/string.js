export const truncate = (str, length) => {
    return str.length > length ? str.substring(0, length - 3) + "..." : str
}
