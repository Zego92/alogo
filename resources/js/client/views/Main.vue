<template>
    <div>
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
                    <h3 class="d-block text-center my-5">Запчасти к популярным автопроизводителям</h3>
                    <hr>
                </div>

                <div class="col-lg-3 col-md-3 col-sm-12 my-5" v-for="car in cars" :key="car.id" >
                    <router-link :to="{name: 'CarCategory', params: {id: car.id}}">
                        <div class="card z-depth-2">
                            <div class="card-body p-0">
                                <div class="view overlay hoverable" style="cursor: pointer !important">
                                    <img class="card-img-top" :src="'/uploads/image/car/' + car.image" :alt="car.name">
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="row align-items-center justify-content-center my-5">
                <div class="col-md-4 my-5">
                    <router-link :to="{name: 'Cars'}" class="btn red darken-3 white-text btn-lg">Все автопроизводители</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: [],
        name: "Main",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapGetters('banners', ['banners']),
            ...mapGetters('main', ['cars']),
        },
        methods: {
            ...mapActions('banners', ['getAllBanners']),
            ...mapActions('main', ['getRandomCars'])

        },
        mounted() {
            this.getAllBanners()
            this.getRandomCars()
        }
    }
</script>

<style scoped>

</style>
