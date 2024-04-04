export const calcTotalPrice = (items) => {
    const totalCount = items ? items.reduce((sum, item) => sum + item.count, 0) : 0;
    return totalCount
}