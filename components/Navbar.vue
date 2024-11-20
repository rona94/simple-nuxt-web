<template>
    <div>
        <nav class="navbar">
            <div class="container">
                <div class="navbar__logo">
                    <NuxtLink to="/">Logo</NuxtLink>
                </div>
                <ul class="navbar__lists">
                    <li>
                        <NuxtLink to="/products">Products</NuxtLink>
                    </li>
                    <li>
                        <button class="navbar__cart" @click="isCartVisibile = !isCartVisibile">
                            <NuxtImg src="images/icon/cart.png" />
                            <span class="navbar__cart-num">{{ cartLength }}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>

        <CartMini v-show="isCartVisibile" />
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

export default {
    data() {
        return {
            // cartLength: 0,
            isCartVisibile: false
        }
    },
    computed: {
        cartLength() {
            return cartStore.cartTotal
        },
    },
    methods: {
        arrangeData(data) {
            let total = 0;
            data.forEach((value, index) => {
                total += value.total || 1;
            })
            cartStore.updateCartTotal(total)
        },
    },
    mounted() {
        fetch("http://localhost:8000/cart")
            .then(res => res.json())
            .then(data => {
                this.arrangeData(data)
            })
            .catch(err => console.log(err))
    }
}
</script>

<style scoped>
.navbar {
    height: 40px;
    background: var(--color-brown);
    display: flex;
    align-items: center;
}
.navbar .container {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    align-items: center;
}
.navbar__logo a {
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    text-decoration: none;
}
.navbar__cart {
    position: relative;
    width: 30px;
    background: none;
    border: 0;
    cursor: pointer;
}
.navbar__cart img {
    width: 100%;
    vertical-align: middle;
}
.navbar__cart-num {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 15px;
    height: 15px;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    border-radius: 100%;
    color: #fff;
    background: rgb(235, 44, 44);
}
.navbar__lists {
    padding: 0;
    margin: 0;
    list-style-type: none;
}
.navbar__lists li {
    display: inline-block;
    margin: 0 0 0 15px
}
.navbar__lists li > a {
    color: #fff;
    text-decoration: none;
}
</style>