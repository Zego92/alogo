<template>
    <div>
        <Loader v-if="loader"/>
        <div class="container my-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent">
                    <li class="breadcrumb-item ml-auto"><router-link class="text-dark" :to="{name: 'Main'}">Главная</router-link></li>
                    <li class="breadcrumb-item active"><a class="text-dark" href="#">Автопроизводители</a></li>
                </ol>
            </nav>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-3 col-sm-12 my-5 bg-transparent align-items-center justify-content-center text-center align-center" v-for="car in cars" :key="car.id">
                    <router-link :to="{name: 'CarCategory', params: {carId: car.id}}">
                        <div class="card bg-transparent hoverable">
                            <div class="card-body p-0 bg-transparent z-depth-2">
                                <div class="view overlay bg-transparent" style="cursor: pointer !important">
                                    <img class="card-img-top bg-transparent" :src="'/uploads/image/car/' + car.image" :alt="car.name">
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <back-to-top bottom="50px" right="50px">
            <button type="button" class="btn red darken-3 btn-to-top white-text"><i class="fa fa-chevron-up "></i></button>
        </back-to-top>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import Vue from 'vue'
    import Loader from "../components/Loader";
    import BackToTop from 'vue-backtotop'
    Vue.use(BackToTop)
    export default {
        props: [],
        name: "Cars",
        data() {
            return {}
        },
        components: {
            Loader,
            BackToTop
        },
        computed: {
            ...mapGetters('cars', ['cars']),
            ...mapState('cars', ['loader'])
        },
        methods: {
            ...mapActions('cars', ['getAllCars']),
        },
        async mounted() {
            await this.getAllCars()
        }
    }
</script>

<style scoped>
    img.card-img-top{
        width: 142px;
        height: 109px;
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
