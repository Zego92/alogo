<template>
    <div>
        <div class="container-fluid my-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent">
                    <li class="breadcrumb-item ml-auto"><router-link class="text-dark" :to="{name: 'Main'}">Главная</router-link></li>
                    <li class="breadcrumb-item"><router-link class="text-dark" :to="{name: 'Cars'}">Автопроизводители</router-link></li>
                    <li class="breadcrumb-item"><router-link class="text-dark" :to="{name: 'CarCategory', params:{carId: this.$props.carId}}">Группы товаров к марке <strong class="font-weight-bold text-danger">{{product.category.cars.name}}</strong></router-link></li>
                    <li class="breadcrumb-item"><router-link class="text-dark" :to="{name: 'CategoryProduct', params: {categoryId: this.$props.categoryId, carId: this.$props.carId}}">Группа товаров <strong class="font-weight-bold text-danger">{{product.category.name}}</strong></router-link></li>
                    <li class="breadcrumb-item active" style="cursor: default;"><a class="text-dark" style="cursor: default;"> {{product.name}} </a></li>
                </ol>
            </nav>
        </div>
        <div class="container">
            <h4 class="d-block text-center">Информация о товаре</h4>
            <!--Section: Block Content-->
            <section class="my-5">
                <div class="row">
                    <div class="col-md-6 mb-4 mb-md-0">
                        <div id="mdb-lightbox-ui"></div>
                        <div class="mdb-lightbox">
                            <div class="row product-gallery mx-1">
                                <div class="col-12 mb-0">
                                    <figure class="view overlay rounded z-depth-1 main-img">
                                        <img :src="'/uploads/image/product/' + product.image" class="img-fluid z-depth-1">
                                    </figure>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="col-md-6">
                        <h5>{{product.name}}</h5>
                        <p class="my-3 text-muted text-uppercase small">{{product.category.name}}</p>
                        <p><span class="mr-1"><strong>Цена : {{product.price}} UAH</strong></span></p>
                        <p class="py-2" v-if="product.description === null">Описание к данному товару отсутствует!</p>
                        <p class="py-2" v-else v-html="product.description">{{product.description}}</p>
                        <hr>
                    </div>
                </div>
            </section>
            <!--Section: Block Content-->
            <div class="row">
                <div class="col-4 col-lg-3 col-md-5 col-sm-12">

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    export default {
        props: ['id', 'carId', 'categoryId'],
        name: "Product",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapGetters('products', ['product'])
        },
        methods: {
            ...mapActions('products', ['getProduct', 'getRandomProductsForProduct'])
        },
        mounted() {
            this.getProduct(this.$props.id)
            this.getRandomProductsForProduct(this.$props.categoryId)
        }
    }
</script>

<style scoped>

</style>
