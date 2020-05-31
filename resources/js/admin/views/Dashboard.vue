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
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-success">
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
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>22</h3>
                                    <p>Товары</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-grip-horizontal"></i>
                                </div>
                                <router-link :to="{name: 'Products'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-cyan">
                                <div class="inner">
                                    <h3>22</h3>
                                    <p>Категории</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-utensils"></i>
                                </div>
                                <router-link :to="{name: 'Category'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-gray-dark">
                                <div class="inner">
                                    <h3>22</h3>
                                    <p>Заказы</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <router-link :to="{name: 'Orders'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-gradient-danger">
                                <div class="inner">
                                    <h3>22</h3>
                                    <p>Баннеры</p>
                                </div>
                                <div class="icon">
                                    <i class="far fa-images"></i>
                                </div>
                                <router-link :to="{name: 'Banners'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
                            </div>
                        </div>
                        <div class="col-lg-3 col-6">
                            <div class="small-box bg-blue-light">
                                <div class="inner">
                                    <h3>22</h3>
                                    <p>Комментарии</p>
                                </div>
                                <div class="icon">
                                    <i class="fas fa-comments"></i>
                                </div>
                                <router-link :to="{name: 'Comments'}" class="small-box-footer">Подробней <i class="fas fa-arrow-circle-right"></i></router-link>
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
            ...mapGetters('users', ['userCount'])
        },
        methods: {
            ...mapActions('users', ['getAllUsers'])
        },
        mounted() {
            this.getAllUsers()
        }
    }
</script>

<style scoped>

</style>
