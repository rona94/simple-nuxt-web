<template>
    <div class="product container">
        <div class="product-column product-column--img">
            <NuxtImg class="img" :src="data.img || 'images/pexels-quang-nguyen-vinh-2144200.jpg'" />
        </div>
        <div class="product-column product-column--details">
            <h1 class="product__header">
                {{ data.name }}
                <span class="product__price">₱{{ data.price }}</span>
            </h1>
            
            <p class="product__description">{{ data.description }}</p>
            
            <ul class="products__list-other">
                <li v-for="tag in data.tags">{{ tag }}</li>
            </ul>

            <div class="product__quantity">
                <div class="product__quantity-minus" @click="handleQuantityClick(-1)">-</div>
                <input ref="input" type="number" name="quantity" v-model="quantity" min="1" max="5">
                <div class="product__quantity-plus" @click="handleQuantityClick(1)">+</div>
            </div>

            <div class="product__buttons">
                <button class="product__button" @click="handleAddToCart">Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'

export default {
    data() {
        return {
            quantity: 1,
            data: {},
        }
    },
    methods: {
        handleQuantityClick(num) {
            let newQuantity = this.quantity + num
            if(newQuantity >= this.$refs.input.getAttribute("min") && newQuantity <= this.$refs.input.getAttribute("max")) {
                this.quantity = newQuantity
            }
        },
        cartLength() {
            const cartStore = useCartStore()

            fetch("http://localhost:8000/cart")
            .then(res => res.json())
            .then(data => {
                let total = 0;
                data.forEach((value, index) => {
                    total += value.total || 1;
                })
                cartStore.updateCartTotal(total)
                cartStore.updateCart(data)
            })
            .catch(err => console.log(err))
        },
        async handleAddToCart() {
            const x = fetch("http://localhost:8000/cart/"+this.$route.params.id)
            .then(res => res.json())
            .then(data => {
                return data
            })
            .catch(err => {
                console.clear() // remove error in console
                return false
            });

            x.then((res) => {
                if(res) {
                    fetch("http://localhost:8000/cart/"+this.$route.params.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...this.data,
                            total: this.quantity + res.total
                        })
                    }).then(res => res.json())
                    .then(data => {
                        // window.location.reload(true)
                        this.cartLength()
                    })
                    .catch(err => console.log(err))
                }
                else {
                    fetch("http://localhost:8000/cart", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...this.data,
                            total: this.quantity
                        })
                    }).then(res => res.json())
                    .then(data => {
                        // window.location.reload(true)
                        this.cartLength()
                    })
                    .catch(err => console.log(err))
                }
            })
            // fetch("http://localhost:8000/cart", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(this.data)
            // }).then(res => res.json())
            // .then(data => {
            //     window.location.reload(true)
            // })
            // .catch(err => console.log(err))
            
            // this.$router.push({path: this.$route.path})
        }
    },
    mounted() {
        fetch("http://localhost:8000/products/"+this.$route.params.id)
            .then((res) => res.json())
            .then((data) => {
                this.data = data
            })
            .catch((err) => console.log(err))
    }
}
</script>

<style scoped>
.product {
    display: flex;
    flex-wrap: wrap;
}
.product-column {
    padding: 50px 15px;
}

.product-column--img {
    width: 45%;
    max-width: 45%;
    box-sizing: border-box;
}
.img {
    max-width: 100%;
    border-radius: 8px;
}

.product-column--details {
    width: 55%;
    max-width: 55%;
    box-sizing: border-box;
}
.product__header {
    margin: 10px 0;
    color: var(--color-brown);
}
.product__price {
    display: inline-block;
    vertical-align: middle;
    color: #333;
    font-size: 25px;
    margin: 0;
}
.product__description {
    color: #aaa;
}

.product__quantity {
    display: flex;
}
.product__quantity-minus,
.product__quantity-plus {
    width: 20px;
    text-align: center;
    background: #eee;
    cursor: pointer;
    user-select: none;
}
.product__quantity input {
    width: 25px;
    border: 1px solid #eee;
    outline: none;
    -moz-appearance: textfield;
    text-align: center;
}
.product__quantity input::-webkit-outer-spin-button,
.product__quantity input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.product__button {
    margin-top: 15px;
    min-width: 200px;
    font-size: 16px;
    padding: 15px;
    color: #fff;
    font-weight: bold;
    background: var(--color-brown);
    border: 1px solid var(--color-brown);
    border-radius: 8px;
    cursor: pointer;
}

.products__list-other {
    padding: 0;
    list-style-type: none;
    margin: 5px 0 15px;
    display: flex;
    gap: 5px;
}
.products__list-other li {
    font-size: 12px;
    background: var(--color-brown);
    color: #fff;
    padding: 3px 8px;
    border-radius: 15px;
}

@media screen and (max-width: 767px) {
    .product {
        display: block;
    }
    .product-column--img,
    .product-column--details {
        width: 100%;
        max-width: 100%;
    }
    .product-column--img {
        padding-bottom: 0;
    }
    .product-column--details {
        padding-top: 0;
    }
    .product__header,
    .product__description,
    .product__buttons {
        text-align: center;
    }
    .products__list-other,
    .product__quantity {
        justify-content: center;
    }
}
</style>