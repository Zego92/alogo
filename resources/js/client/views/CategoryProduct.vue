<template>
    <div>
        <Loader v-if="loader"/>
        <div class="container my-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent">
                    <li class="breadcrumb-item ml-auto"><router-link class="text-dark" :to="{name: 'Main'}">Главная</router-link></li>
                    <li class="breadcrumb-item"><router-link class="text-dark" :to="{name: 'Cars'}">Автопроизводители</router-link></li>
                    <li class="breadcrumb-item"><router-link class="text-dark" :to="{name: 'CarCategory', params:{carId: this.$props.carId}}">Группы товаров к марке <strong class="font-weight-bold text-danger">{{products.cars.name}}</strong></router-link></li>
                    <li class="breadcrumb-item active" style="cursor: default;"><a class="text-dark" style="cursor: default;"> Товары </a></li>
                </ol>
            </nav>
        </div>
        <div class="container my-5">
            <div class="row align-items-center justify-content-center text-center my-5">
                <div class="col-md-12">
                    <form>
                        <div class="form-group row">
                            <label for="productSearchInput" class="col-sm-2 col-form-label align-middle">Поиск</label>
                            <div class="col-sm-8">
                                <div class="md-form mt-0">
                                    <input type="text" class="form-control" id="productSearchInput" placeholder="Введите название или каталожный номер товара">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="container my-5">
            <div class="row my-5">
                <div class="col-lg-3 col-md-3 col-sm-12 my-5" v-for="product in products.products" :key="product.id">
                    <router-link :to="{name: 'Product', params: {id: product.id}}" style="text-decoration: none;">
                        <div class="card hoverable">
                            <div class="card-body p-0 z-depth-2">
                                <div class="view overlay" style="cursor: pointer !important">
                                    <img id="category" class="card-img-top category" :src="'/uploads/image/product/' + product.image" :alt="product.name">
                                </div>
                                <span class="black-text d-block text-center my-3">{{product.name.substr(0, 20) + '...'}}</span>
                                <span class="black-text d-block text-center my-3">Цена: {{product.price}} UAH</span>
                            </div>
                        </div>
                    </router-link>
                    <button @click.prevent="addProduct({productId: product.id, name: product.name, price: product.price, quantity: 1})" class="btn btn-block red darken-3 white-text"><i class="fas fa-shopping-cart"></i> В корзину</button>
                </div>
            </div>
        </div>
        <back-to-top bottom="50px" right="50px">
            <button type="button" class="btn red darken-3 btn-to-top white-text"><i class="fa fa-chevron-up "></i></button>
        </back-to-top>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
    import Vue from 'vue'
    import Loader from "../components/Loader";
    import BackToTop from 'vue-backtotop'
    Vue.use(BackToTop)
    export default {
        props: ['categoryId', 'carId'],
        name: "CategoryProduct",
        data() {
            return {
                filterPriceData: {
                    price: ''
                }
            }
        },
        components: {
            Loader,
            BackToTop
        },
        computed: {
            ...mapGetters('products', ['products']),
            ...mapState('products', ['loader']),
            ...mapGetters('category', ['categories']),
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
            ...mapActions('products', ['getAllProducts']),
            ...mapActions('category', ['getAllCategory']),
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
        mounted() {
            this.getAllProducts(this.$props.categoryId)
        }
    }
</script>

<style scoped>
    img.category{
        width: 160px;
        height: 160px;
    }
    .btn-to-top {
        width: 60px;
        height: 60px;
        padding: 10px 16px;
        border-radius: 50%;
        font-size: 22px;
        line-height: 22px;
    }
</style>
