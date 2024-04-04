import {calcTotalPrice} from "../utils/calcTotalPrice";


export const getCartFromLs = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items); // Передача items в функцию calcTotalPrice

    if (items.length) {
        return {
            items, // Возвращаем items
            totalPrice,
        }
    }
    
    return {
        items: [], // Если корзина пуста, возвращаем пустой массив
        totalPrice: 0,
    };
}