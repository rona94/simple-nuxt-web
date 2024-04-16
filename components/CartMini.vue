<template>
    <div class="container cart-container">
        <div class="cart">
            <div class="cart__lists">
                <template v-if="data.length > 0">
                    <div class="cart__list" v-for="item in data">
                        <div class="cart__details">
                            <NuxtImg :src="item.img || 'images/pexels-quang-nguyen-vinh-2144200.jpg'" />
                            <div class="cart__info">
                                <p class="cart__title">{{ item.name }}</p>
                                <p class="cart__price">₱{{ item.price }}</p>
                            </div>
                        </div>
                        <div class="cart__quantity" v-if="item.total > 1">
                            x {{ item.total }}
                        </div>
                        <button class="cart__delete" @click="handleDelete(item.id)">
                            Delete
                        </button>
                    </div>
                </template>
                <div v-else>
                    <p class="cart__empty"><em>Cart is empty</em></p>
                </div>
            </div>
            <div class="cart__checkout">
                <button>Checkout</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: []
        }
    },
    methods: {
        handleDelete(id) {
            console.log("http://localhost:8000/cart/"+id)
            fetch("http://localhost:8000/cart/"+id, {
                method: 'DELETE',
            }).then(res => res.json())
            .then(data => {
                window.location.reload(true)
            })
            .catch(err => console.log(err))
        },
        arrangeData(data) {
            let newData = [];
            let ids = [];
            data.forEach((value, index) => {
                if(!ids.includes(value.id)) {
                    ids.push(value.id)
                    newData.push({
                        ...value,
                        total: 1
                    })
                }
                else {
                    newData[ids.indexOf(value.id)]["total"] = newData[ids.indexOf(value.id)]["total"]+1;
                }
            })

            this.data = newData
        },
        getData() {
            fetch("http://localhost:8000/cart")
                .then(res => res.json())
                .then(data => {
                    this.arrangeData(data)
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>
.cart-container {
    position: relative;
}
.cart {
    position: absolute;
    top: 0;
    right: 0;
    width: 350px;
    min-height: 100px;
    background-color: #fff;
    z-index: 999;
    box-shadow: 1px 1px 8px 1px rgba(0,0,0,0.1);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}
.cart__list {
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
}
.cart__details {
    display: flex;
}
.cart__list img {
    width: 100px;
    margin: 10px;
}
.cart__title {
    margin: 10px 0 0;
    font-weight: bold;
    font-size: 18px;
    color: var(--color-brown);
}
.cart__price {
    margin: 0;
}
.cart__delete {
    width: 60px;
    background: rgb(235, 44, 44);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 0;
}
.cart__checkout {
    padding: 10px;
    float: right;
}
.cart__checkout button {
    font-size: 14px;
    padding: 10px 15px;
    color: #fff;
    font-weight: bold;
    background: var(--color-brown);
    border: 1px solid var(--color-brown);
    border-radius: 8px;
    cursor: pointer;
}
.cart__empty {
    padding: 15px 15px;
    margin: 0;
    border-bottom: 1px solid #eee;
}
.cart__quantity {
    display: flex;
    /* justify-content: center;
    align-items: center; */
    color: #aaa;
    margin: 10px;
}
@media screen and (max-width: 767px) {
    .cart {
        width: 100%;
    }
}
</style>