export const removeDuplicatesFromStringArray = (array: string[]): string[] => {
    return [...new Set(array)]
}
