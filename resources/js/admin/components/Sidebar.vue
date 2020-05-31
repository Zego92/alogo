<template>
    <div>
        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <router-link :to="{name: 'Dashboard'}" class="brand-link">
                <img src="../assets/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                     style="opacity: .8">
                <span class="brand-text font-weight-light">Admin</span>
            </router-link>
            <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img src="../assets/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                    </div>
                    <div class="info">
                        <a class="d-block" style="cursor:default;">Администратор</a>
                    </div>
                </div>
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li class="nav-item">
                            <router-link :to="{name: 'Dashboard'}" class="nav-link">
                                <i class="nav-icon fas fa-tachometer-alt"></i>
                                <p>Главная</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'Users'}" class="nav-link">
                                <i class="nav-icon fas fa-users"></i>
                                <p>Пользователи</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'Category'}" class="nav-link">
                                <i class="nav-icon fas fa-grip-horizontal"></i>
                                <p>Категории</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'Products'}" class="nav-link">
                                <i class="nav-icon fas fa-clipboard-list"></i>
                                <p>Продукты</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'Orders'}" class="nav-link">
                                <i class="nav-icon fas fa-shopping-cart"></i>
                                <p>Заказы</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'Banners'}" class="nav-link">
                                <i class="nav-icon far fa-images"></i>
                                <p>Банеры</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'Comments'}" class="nav-link">
                                <i class="nav-icon fas fa-comments"></i>
                                <p>Комментарии</p>
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <router-link :to="{name: 'Company'}" class="nav-link">
                                <i class="nav-icon fas fa-crown"></i>
                                <p>О Нас</p>
                            </router-link>
                        </li>

                        <li class="nav-item" >
                            <a  class="nav-link" style="cursor:pointer;">
                                <i class="nav-icon fas fa-power-off text-danger"></i>
                                <p>Выход</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>

</style>
