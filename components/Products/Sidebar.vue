<template>
    <aside class="sidebar">
        <ul>
            <li>
                <label class="select">
                    <div class="select__label">Sort by:</div>
                    <select @change="handleSort">
                        <option value="0">Name (A - Z)</option>
                        <option value="1">Name (Z - A)</option>
                    </select>
                </label>
            </li>
            <li>
                <div class="line-break"></div>
            </li>
            <li v-for="(filter,index) in filters">
                <label class="checkbox">
                    <input type="checkbox" v-model="checkbox[index]" @change="handleChange($event)" checked>
                    <div class="checkbox__checkbox"></div>
                    <div class="checkbox__label">
                        {{ filter }}
                    </div>
                </label>
            </li>   
        </ul> 
    </aside>
</template>

<script>
export default {
    data() {
        return {
            checkbox: []
        }
    },
    props: ["filters"],
    methods: {
        handleChange(e) {
            this.$emit("filterData", this.checkbox)
        },
        handleSort(e) {
            this.$emit("sortData", e.target.value)
        }
    }
}
</script>

<style scoped>
.sidebar {
    width: 200px;
    background: var(--color-brown);
    box-sizing: border-box;
    padding: 15px;
    border-radius: 15px;
}
.sidebar ul {
    list-style-type: none;
    padding: 0;
}
.line-break {
    width: 100%;
    height: 1px;
    background: #fff;
    margin: 15px 0;
}
.sidebar h6 {
    font-size: 16px;
    margin: 0 0 5px;
    color: #fff;
}
@media screen and (max-width: 767px) {
    .sidebar {
        width: 100%;
        margin-bottom: 15px;
    }
}
</style>