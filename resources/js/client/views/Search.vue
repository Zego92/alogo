<template>
    <div>
        <Loader v-if="loader"/>
        <div class="container my-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent">
                    <li class="breadcrumb-item ml-auto"><router-link class="text-dark" :to="{name: 'Main'}">Главная</router-link></li>
                    <li class="breadcrumb-item active" style="cursor: default;"><a class="text-dark" style="cursor: default;"> Поиск Товаров </a></li>
                </ol>
            </nav>
        </div>
        <div class="container my-5">
            <h4 class="d-block text-dark text-center"></h4>
            <div class="row my-5">
                <div class="col-lg-6 col-md-6 col-sm-12 my-5">
                    <div class="md-form">
                        <input v-model="vinData.vin" type="text" id="carVinSearch" class="form-control" minlength="16">
                        <label for="carVinSearch">Введите VIN-код</label>
                    </div>
                    <div class="md-form">
                        <button @click.prevent="onClickSearchByVin" class="btn red darken-3 btn-block white-text">Поиск</button>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 my-5">
                    <div class="md-form">
                        <input v-model="articleData.article" type="text" id="productSearch" class="form-control">
                        <label for="productSearch">Введите каталожный номер</label>
                    </div>
                    <div class="md-form">
                        <button @click.prevent="onClickSearchByProduct" class="btn red darken-3 btn-block white-text">Поиск</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container my-5">
            <div class="row my-5 align-items-center justify-content-center">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <ul class="list-group list-group-flush bg-transparent">
                        <li class="list-group-item bg-transparent py-3"  v-if="!this.getManufacturer.length" style="display: none">Название модели : {{this.getManufacturer}}</li>
                        <li class="list-group-item bg-transparent py-3"  v-else>Название модели : {{this.getManufacturer}}</li>
                        <li class="list-group-item bg-transparent py-3" v-for="year in getModelYear">Модельный год : {{year}}</li>
                        <li class="list-group-item bg-transparent py-3" v-if="!this.getCountry.length" style="display: none"> Страна / Регион : {{this.getCountry}} / {{this.getRegion}}</li>
                        <li class="list-group-item bg-transparent py-3" v-else> Страна / Регион : {{this.getCountry}} / {{this.getRegion}}</li>
                    </ul>
                    <router-link v-if="!this.getManufacturer.length" style="display: none" class="btn red darken-3 btn-block white-text" :to="{name: 'CarCategory', params: {carId: car.id}}">К товарам</router-link>
                    <router-link v-else class="btn red darken-3 btn-block white-text my-4" :to="{name: 'CarCategory', params: {carId: car.id}}">К товарам</router-link>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 d-block float-lg-right" v-if="!this.getManufacturer.length" style="display: none">
                    <div class="view overlay bg-transparent d-block float-lg-right">
                        <img class="card-img-top bg-transparent" :src="'/uploads/image/car/' + car.image" :alt="car.name" style="display: none">
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 d-block float-lg-right" v-else>
                    <div class="view overlay bg-transparent d-block float-lg-right">
                        <img class="card-img-top bg-transparent" :src="'/uploads/image/car/' + car.image" :alt="car.name">
                    </div>
                </div>
            </div>
        </div>
        <div class="container my-5">
            <div class="row my-5">
                <div class="col-lg-3 col-md-3 col-sm-12 my-5 align-items-center justify-content-center text-center align-center" v-if="products.length < 0">
                    <h4 class="text-dark d-block text-center">По вашему запросу ничего не найдено</h4>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 my-5 align-items-center justify-content-center text-center align-center" v-else v-for="product in products" :key="product.id">
                    <router-link :to="{name: 'Product', params: {id: product.id}}" style="text-decoration: none;">
                        <div class="card hoverable">
                            <div class="card-body p-0 z-depth-2">
                                <div class="view overlay" style="cursor: pointer !important">
                                    <img id="category" class="card-img-top category" :src="'/uploads/image/product/' + product.image" :alt="product.name">
                                </div>
                                <span class="black-text">{{product.name.substr(0, 20) + '...'}}</span>
                                <span class="black-text d-block text-center">Цена: {{product.price}} UAH</span>
                            </div>
                        </div>
                    </router-link>
                    <button class="btn btn-block red darken-3 white-text"><i class="fas fa-shopping-cart"></i> В корзину</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex'
    import Vue from 'vue'
    import Loader from "../components/Loader";
    export default {
        props: [],
        name: "Search",
        data() {
            return {
                vinData: {
                    vin: ''
                },
                articleData: {
                    article: ''
                }
            }
        },
        components: {Loader},
        computed: {
            ...mapGetters('search', ['getRegion', 'getCountry', 'getManufacturer', 'getModelYear', 'car', 'products']),
            ...mapState('search', ['loader']),

        },
        methods: {
            ...mapActions('search', ['searchByVin', 'searchByProduct']),
            onClickSearchByVin()
            {
                this.$store.commit('search/setProducts', '');
                this.searchByVin(this.vinData)
                .then(() => {
                    this.clearVinData()
                })
                .catch((error) => {
                    Vue.swal({
                        toast:true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: 'error',
                        title: error.response.data.error
                    })
                })
            },

            onClickSearchByProduct()
            {
                this.$store.commit('search/setCar', '')
                this.$store.commit('search/setRegion', '')
                this.$store.commit('search/setCountry', '')
                this.$store.commit('search/setManufacturer', '')
                this.$store.commit('search/setModelYear', '')
                this.searchByProduct(this.articleData)
                .then(() => {
                    this.clearArticleData()
                })
                .catch((error) => {
                    Vue.swal({
                        toast:true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: 'error',
                        title: error.response.data.message
                    })
                })
            },

            clearVinData()
            {
                this.vinData = {
                    vin: ''
                }
            },
            clearArticleData()
            {
                this.articleData = {
                    article: ''
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    img.card-img-top{
        width: 142px;
        height: 109px;
    }
</style>
