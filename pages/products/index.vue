<template>
    <HomeHeader />

    <div class="products container">
        <ProductsSidebar 
            :filters="filters"
            @sortData="sortData"
            @filterData="filterData" />
        <ProductsLists 
            :data="data" 
            :activeFilters="activeFilters" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [],
            filters: ["Cake", "Cupcake", "Candy", "Dessert", "Drinks"],
            activeFilters: ["Cake", "Cupcake", "Candy", "Dessert", "Drinks"]
        }
    },
    methods: {
        filterData(checkbox) {
            this.activeFilters = this.filters.filter((value, index) => {
                return checkbox[index] == undefined || checkbox[index] 
            })
        },
        sortData(sort) {
            this.data = this.data.sort((a, b)=>{
                if(sort == 0) {
                    return a.name > b.name ? 1: -1;
                }
                else {
                    return b.name > a.name ? 1: -1;
                }
            })
        }
    },
    mounted() {
        fetch("http://localhost:8000/products")
            .then((res) => res.json())
            .then((data) => {
                this.data = data
            })
            .catch((err) => console.log(err))
    }
}
</script>

<style scoped>
.products {
    gap: 15px;
    padding-bottom: 50px;
    display: flex;
}
@media screen and (max-width: 767px) {
    .products {
        display: block;
    }
}

</style>