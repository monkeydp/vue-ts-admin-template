export const isExternal = (path: string) => /^(http?:|https?:|mailto:|tel:)/.test(path)
