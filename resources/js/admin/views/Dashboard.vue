<template>
    <div>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Главная</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{userCount}}</h3>
                                    <p>Пользователи</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-users"></i>
                                </div>
                                <router-link :to="{name: 'Users'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{carCount}}</h3>
                                    <p>Автопроизводители</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-car"></i>
                                </div>
                                <router-link :to="{name: 'Cars'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{categoryCount}}</h3>
                                    <p>Категории</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-grip-horizontal"></i>
                                </div>
                                <router-link :to="{name: 'Category'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{productCount}}</h3>
                                    <p>Товары</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-clipboard-list"></i>
                                </div>
                                <router-link :to="{name: 'Product'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{orderCount}}</h3>
                                    <p>Заказы</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <router-link :to="{name: 'Orders'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{bannerCount}}</h3>
                                    <p>Баннеры</p>
                                </div>
                                <div class="icon">
                                    <i class="far fa-images"></i>
                                </div>
                                <router-link :to="{name: 'Banners'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{commentCount}}</h3>
                                    <p>Комментарии</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-comments"></i>
                                </div>
                                <router-link :to="{name: 'Comments'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{feedbackCount}}</h3>
                                    <p>Обратная связь</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-rss"></i>
                                </div>
                                <router-link :to="{name: 'Feedback'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12 my-3">
                            <div class="small-box bg-primary shadow-lg">
                                <div class="inner">
                                    <h3>{{subscriberCount}}</h3>
                                    <p>Подписчики</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-bell"></i>
                                </div>
                                <router-link :to="{name: 'Subscribers'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "Dashboard",
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapGetters('users', ['userCount']),
            ...mapGetters('categories', ['categoryCount']),
            ...mapGetters('cars', ['carCount']),
            ...mapGetters('orders', ['orderCount']),
            ...mapGetters('banners', ['bannerCount']),
            ...mapGetters('comments', ['commentCount']),
            ...mapGetters('products', ['productCount']),
            ...mapGetters('feedback', ['feedbackCount']),
            ...mapGetters('subscribers', ['subscriberCount']),
        },
        methods: {
            ...mapActions('users', ['getAllUsers']),
            ...mapActions('categories', ['getAllCategories']),
            ...mapActions('orders', ['getAllOrders']),
            ...mapActions('cars', ['getAllCars']),
            ...mapActions('banners', ['getAllBanners']),
            ...mapActions('comments', ['getAllComments']),
            ...mapActions('products', ['getAllProducts']),
            ...mapActions('feedback', ['getAllFeedback']),
            ...mapActions('subscribers', ['getAllSubscribers']),
        },
        mounted() {
            this.getAllUsers();
            this.getAllCategories()
            this.getAllCars()
            this.getAllOrders()
            this.getAllBanners()
            this.getAllComments()
            this.getAllProducts()
            this.getAllFeedback()
            this.getAllSubscribers()
        }
    }
</script>

<style scoped>

</style>
