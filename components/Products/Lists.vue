<template>
    <div class="products__lists">
        <template v-for="item in data">
            <NuxtLink :to="`/products/${item.id}`" class="products__list" v-if="checkVisibility(item)">
                <div class="products__list-img">
                    <NuxtImg :src="item.img" />
                </div>
                <div class="products__list-details">
                    <div class="name" title="Lorem Ipsum">
                        {{ item.name }}
                    </div>
                    <div class="price">
                        ₱{{ item.price }}
                    </div>
                </div>
                <ul class="products__list-other">
                    <li v-for="tag in item.tags">{{ tag }}</li>
                </ul>
            </NuxtLink>
        </template>
    </div>
</template>

<script>
    export default {
        props: ["data", "activeFilters"],
        methods: {
            checkVisibility(item) {
                let isVisibile = false;
                
                for (let index=0; index < item.tags.length; index++) {
                    if(this.activeFilters.includes(item.tags[index])) {
                        isVisibile = true;
                        break;
                    }
                }

                return isVisibile;
            },
        },
    }
</script>

<style scoped>
.products__lists {
    display: flex;
    gap: 15px;
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    flex-wrap: wrap;
}
.products__list {
    width: calc(25% - 12px);
    box-sizing: border-box;
    padding: 15px;
    background: #fff;
    box-shadow: 1px 1px 5px 1px rgba(0,0,0,0.1);
    border-radius: 15px;
    cursor: pointer;
    text-decoration: none;
}

.products__list-img img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 12px;
}

.products__list-details {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}
.products__list-details .name {
    color: var(--color-brown);
    max-width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.products__list-details .price {
    color: #333;
    font-weight: bold;
    text-align: right;
}

.products__list-other {
    padding: 0;
    list-style-type: none;
    margin: 5px 0 0;
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
    .products__list {
        width: calc(100%);
    }
}
</style>