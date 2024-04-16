<template>
    <div class="slider">
        <div class="slider__content">
            <div ref="slider" class="slider__lists">
                <template v-for="item in data">
                    <NuxtLink class="product slider__list" :to="`/products/${item.id}`">
                        <NuxtImg class="product__img" :src="item.img || 'images/pexels-quang-nguyen-vinh-2144200.jpg'" />
                        <p class="product__title">{{ item.name }}</p>
                        <p class="product__price">₱{{ item.price }}</p>
                    </NuxtLink>
                </template>
            </div>
        </div>
        <div class="slider-events">
            <button class="slider-prev" @click="handleNext(-1)">
                <NuxtImg src="images/icon/left-arrow.png" />
            </button>
            <button class="slider-next" @click="handleNext(1)">
                <NuxtImg src="images/icon/right-arrow.png" />
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeNum: 0,
            data: [],
        }
    },
    methods: {
        handleNext(num) {
            let item = () => {
                const width = document.body.clientWidth

                if(width >= 992) {
                    return 4
                }
                else if(width >= 768) {
                    return 2
                }
                else {
                    return 1
                }
            }

            let itemLength = item()
            let itemWidth = 1/itemLength*100
            let newNum = this.activeNum + num
            
            if(newNum >= 0 && newNum < this.data.length/itemLength) {
                this.activeNum = newNum
            }

            let translate = (this.activeNum * itemLength) * itemWidth * -1
            this.$refs.slider.style.transform = `translateX(${translate}%)`
        },
        getProducts() {
            fetch("http://localhost:8000/products")
                .then((res) => res.json())
                .then((data) => {
                    this.data = data
                })
                .catch((err) => console.log(err))
        },
        onResize(e) {
            this.activeNum = 0
            this.$refs.slider.style.transform = `translateX(0)`
        },
    },
    mounted() {
        this.getProducts()
        window.addEventListener('resize', this.onResize)
    }
}
</script>

<style scoped>
.slider {
    position: relative;
    padding: 0 0 50px;
    width: 100%;
}
.slider-prev,
.slider-next {
    position: absolute;
    top: 32%;
    width: 30px;
    height: 30px;
    background: var(--color-brown);
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
}
.slider-prev {
    left: -20px;
}
.slider-next {
    right: -20px;
}
.slider-prev img,
.slider-next img {
    width: 50%;
}
.slider__content {
    overflow: hidden;
}
.slider__lists {
    white-space: nowrap; 
    transition: all 0.3s;
}
.slider__list {
    width: 25%;
    display: inline-block;
    padding: 15px;
    box-sizing: border-box;
}
.slider__list img {
    width: 100%;
}
.product {
    text-decoration: none;
}
.product__img {
    border-radius: 8px;
}
.product__title {
    margin: 0;
    text-align: center;
    color: var(--color-brown);
    font-weight: bold;
    font-size: 18px;
}
.product__price {
    margin: 0;
    text-align: center;
    color: #333;
}
@media screen and (max-width: 991px) {
    .slider__list {
        width: 50%;
    }
    .slider-prev,
    .slider-next {
        width: 25px;
        height: 25px;
    }
    .slider-prev {
        left: -15px;
    }
    .slider-next {
        right: -15px;
    }
}
@media screen and (max-width: 767px) {
    .slider__list {
        width: 100%;
    }
}
</style>