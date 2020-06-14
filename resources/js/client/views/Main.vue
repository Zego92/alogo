<template>
    <div>
        <Loader v-if="loader"/>
        <div id="carousel-example-1z" class="carousel slide carousel-fade mb-5" data-ride="carousel">
            <div class="carousel-inner" role="listbox" >
                <div class="carousel-item" v-for="(banner,idx) in banners" :class="{ active: idx === 0 }">
                    <img class="d-block w-100" height="600px" :src="'/uploads/image/banner/' + banner.image" alt="First slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <!--/.Carousel Wrapper-->

        <div class="container my-5">
            <div class="row my-5">
                <div class="col-md-12 my-5">
                    <h3 class="d-block text-center my-5">АВТОЗАПЧАСТИ ДЛЯ ПОПУЛЯРНЫХ МОДЕЛЕЙ АВТО</h3>
                    <hr>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-12 my-5 bg-transparent align-items-center justify-content-center text-center align-center" v-for="car in cars" :key="car.id">
                    <router-link :to="{name: 'CarCategory', params: {carId: car.id}}">
                        <div class="card bg-transparent hoverable">
                            <div class="card-body p-0 bg-transparent z-depth-2">
                                <div class="view overlay bg-transparent" style="cursor: pointer !important">
                                    <img id="cars" class="card-img-top bg-transparent cars" :src="'/uploads/image/car/' + car.image" :alt="car.name">
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="col-md-12 align-items-center justify-content-center text-center my-5 mx-auto">
                    <router-link :to="{name: 'Cars'}" class="btn red darken-3 white-text btn-lg">Все автопроизводители</router-link>
                </div>
            </div>
            <div class="row my-5">
                <div class="col-md-12 my-5">
                    <h3 class="d-block text-center my-5">ПОПУЛЯРНЫЕ ГРУППЫ ТОВАРОВ АВТОЗАПЧАСТЕЙ</h3>
                    <hr>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 my-5 align-items-center justify-content-center text-center align-center" v-for="category in categories" :key="category.id">
                    <router-link :to="{name: 'CategoryProduct', params: {categoryId: category.id, carId: category.cars.id}}" style="text-decoration: none;">
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
            <div class="row my-5">
                <div class="col-md-12 my-5">
                    <h3 class="d-block text-center my-5">ПОПУЛЯРНЫЕ ТОВАРЫ АВТОЗАПЧАСТЕЙ</h3>
                    <hr>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 my-5 align-items-center justify-content-center text-center align-center" v-for="product in products" :key="product.id">
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
                    <button @click.prevent="addProduct({productId: product.id, name: product.name, price: product.price, quantity: 1})" class="btn btn-block red darken-3 white-text"><i class="fas fa-shopping-cart"></i> В корзину</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import Loader from "../components/Loader";
    import Vue from "vue";
    export default {
        props: [],
        name: "Main",
        data() {
            return {}
        },
        components: {Loader},
        computed: {
            ...mapGetters('main', ['cars', 'categories', 'products', 'banners']),
            ...mapState('main', ['loader']),
            orderProducts() {
                return this.$store.state.orders.orderProducts;
            },
            summ() {
                return this.orderProducts.reduce((acc, item) => {
                    return acc += item.price * item.quantity;
                }, 0)
            },
            deliverySumm() {
                if (!+this.formData.delivery || this.summ === 0) {
                    return 0
                }
                return this.summ >= 300 ? 0 : 150;
            },
            total() {
                return this.summ + this.deliverySumm;
            },
        },
        methods: {
            ...mapActions('main', ['getRandomCars', 'getRandomCategory', 'getRandomProducts', 'getAllBanners']),
            ...mapMutations('orders', ['removeOrder', 'incrementProductQuantity', 'decrementProductQuantity', 'clearOrder']),
            addProduct(value) {
                Vue.swal({
                    toast:true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: 'success',
                    title: 'Товар добавлен в корзину'
                })
                this.$store.commit('orders/addProduct', value);
            },

        },
        async mounted() {
            await this.getAllBanners()
            await this.getRandomCars()
            await this.getRandomCategory()
            await this.getRandomProducts()
        }
    }
</script>

<style scoped>
    img.cars{
        width: 142px;
        height: 109px;
    }
    img.category{
        width: 160px;
        height: 160px;
    }
    span.category-link{
        text-decoration: none !important;
    }
    span.category-link:hover{
        text-decoration: none !important;

    }
</style>
