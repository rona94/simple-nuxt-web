import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
    state: () => {
        return { 
            cartTotal: 0 ,
            cart: []
        }
    },
    actions: {
        updateCartTotal(total:number) {
            this.cartTotal = total
        },
        updateCart(cart:[]) {
            this.cart = cart
        },
    },
})