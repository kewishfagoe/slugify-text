export const isWhitespaceString = (str) => {
    return !/\S/.test(str)
}

export const isEmptyString = (str) =>  {
    return str.length === 0 || str === null
}
