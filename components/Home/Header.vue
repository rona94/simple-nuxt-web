<template>
    <div ref="slider" id="slider" class="slider">
        <div ref="lists" class="slider__lists">
            <div class="slider__list" :style="{'width': sliderWidth + 'px'}">
                <NuxtImg src="images/pexels-quang-nguyen-vinh-2144200.jpg" /> 
            </div>
            <div class="slider__list" :style="{'width': sliderWidth + 'px'}">
                <NuxtImg src="images/pexels-quang-nguyen-vinh-2144200.jpg" /> 
            </div>
            <div class="slider__list" :style="{'width': sliderWidth + 'px'}">
                <NuxtImg src="images/pexels-quang-nguyen-vinh-2144200.jpg" /> 
            </div>
        </div>
        <ul class="slider__controls">
            <li><button @click="slideNext(0)" :class="{active:active==0}"></button></li>
            <li><button @click="slideNext(1)" :class="{active:active==1}"></button></li>
            <li><button @click="slideNext(2)" :class="{active:active==2}"></button></li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            sliderWidth: 0,
            interval: null
        }
    },
    methods: {
        slideNext(num) {
            this.active = num;
            let transform = this.sliderWidth * this.active * -1;
            document.querySelector(".slider__lists").style.transform = `translateX(${transform}px)`;
            // this.$refs.lists.style.transform = `translateX(${transform}px)`;
        },
        resizeImage() {
            this.sliderWidth = this.$refs.slider.clientWidth;
        },
        onResize(e) {
            this.resizeImage();
            this.slideNext(this.active);
        },
        animateImage() {
            this.interval = setInterval(() => {
                let newActive = this.active+1
                let length = document.querySelectorAll("#slider .slider__list").length || 0
                
                if(newActive > length - 1) {
                    newActive = 0
                }
                
                this.slideNext(newActive)
            }, 5000)
        }
    },
    mounted() {
        this.resizeImage();
        this.animateImage();
        window.addEventListener('resize', this.onResize)
    },
    unmounted() {
        clearInterval(this.interval)
    }
}
</script>

<style scoped>
.slider {
    position: relative;
    width: 100%;
    max-height: 700px;
    background: rgb(173, 149, 240);
    overflow: hidden;
    margin: 0 auto 50px;
}
/* list */
.slider__lists {
    display: flex;
    width: 999999px;
    transition: all 0.3s;
}
.slider .slider__list {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 600px;
    width: 100vw;
}
.slider img {
    width: 100%;
}
/* control */
.slider__controls {
    position: absolute;
    bottom: 15px;
    left: 0;
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    width: 100%;
    list-style-type: none;
}
.slider__controls li button {
    width: 40px;
    height: 5px;
    background: #fff;
    border: 1px solid #fff;
    display: block;
    margin: 0 3px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 1px 1px 8px 1px rgba(0,0,0,0.5);
}
.slider__controls li button.active,
.slider__controls li button:hover {
    background-color: var(--color-brown);
    border-color: var(--color-brown);
}
</style>