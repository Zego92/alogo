<template>
    <div>
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
        <div class="container-fluid">

        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    export default {
        props: ['categoryId', 'carId'],
        name: "CategoryProduct",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapGetters('products', ['products'])
        },
        methods: {
            ...mapActions('products', ['getAllProducts']),
        },
        mounted() {
            this.getAllProducts(this.$props.categoryId)
        }
    }
</script>

<style scoped>

</style>
