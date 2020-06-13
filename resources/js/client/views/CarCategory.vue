<template>
    <div>
        <div class="container my-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent">
                    <li class="breadcrumb-item ml-auto"><router-link class="text-dark" :to="{name: 'Main'}">Главная</router-link></li>
                    <li class="breadcrumb-item"><router-link class="text-dark" :to="{name: 'Cars'}">Автопроизводители</router-link></li>
                    <li class="breadcrumb-item active" style="cursor: default;"><a class="text-dark" style="cursor: default;">Группы товаров к марке <strong class="font-weight-bold text-danger">{{categories.name}}</strong></a></li>
                </ol>
            </nav>
        </div>
        <div class="container">
            <div class="row my-5">
                <div class="col-md-12 my-5">
                    <h3 class="d-block text-center my-5">ГРУППЫ ТОВАРОВ АВТОЗАПЧАСТЕЙ К МАРКЕ <strong class="font-weight-bold text-danger">{{categories.name}}</strong></h3>
                    <hr>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 my-5 align-items-center justify-content-center text-center align-center" v-if="!categories.category.length">
                    <h4 class="d-block text-center my-5">ПРИНОСИМ СВОИ ИЗВЕНЕНИЯ! ПОСТАВКА ЗАПЧАСТЕЙ ОЖИДАЕТСЯ В БЛИЖАЙШЕЕ ВРЕМЯ. СЛЕДИТЕ ЗА НАШИМИ НОВОСТЯМИ. СПАСИБО!</h4>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 my-5 align-items-center justify-content-center text-center align-center" v-else v-for="category in categories.category" :key="category.id">
                    <router-link :to="{name: 'CategoryProduct', params: {categoryId: category.id, carId: categories.id}}" style="text-decoration: none;">
                        <div class="card hoverable">
                            <div class="card-body p-0 bg-transparent z-depth-2">
                                <div class="view overlay" style="cursor: pointer !important">
                                    <img id="category" class="card-img-top category" :src="'/uploads/image/category/' + category.image" :alt="category.name">
                                </div>
                                <span class="black-text category-link nav-link text-decoration-none">{{category.name.substr(0, 20) + '...'}}</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    export default {
        props: ['carId'],
        name: "CarCategory",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapGetters('category', ['categories'])
        },
        methods: {
            ...mapActions('category', ['getAllCategory'])
        },
        mounted() {
            this.getAllCategory(this.$props.carId)
        }
    }
</script>

<style scoped>
    li.breadcrumb-item.active{
        cursor: default;
    }
</style>
