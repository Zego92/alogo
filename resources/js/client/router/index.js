import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: { name: 'Main' }
    },
    {
        path: '/main',
        name: 'Main',
        meta:{layout: 'main', title: 'Alogo | Главная'},
        component: require('../views/Main').default
    },
    {
        path: '/cars',
        name: 'Cars',
        meta:{layout: 'main', title: 'Alogo | Каталог товаров'},
        component: require('../views/Cars').default
    },
    {
        path: '/category',
        name: 'Category',
        meta:{layout: 'main', title: 'Alogo | Каталог товаров'},
        component: require('../views/Category').default
    },
    {
        path: '/products',
        name: 'Products',
        meta:{layout: 'main', title: 'Alogo | Каталог товаров'},
        component: require('../views/Products').default
    },
    {
        path: '/search',
        name: 'Search',
        meta:{layout: 'main', title: 'Alogo | Поиск товаров'},
        component: require('../views/Search').default
    },
    {
        path: '/product/:id',
        name: 'Product',
        meta:{layout: 'main', title: 'Alogo | Каталог товаров'},
        component: require('../views/Product').default,
        props: true
    },
    {
        path: '/cars/:carId/category/',
        name: 'CarCategory',
        meta:{layout: 'main', title: 'Alogo | Каталог товаров'},
        component: require('../views/CarCategory').default,
        props: true
    },
    {
        path: '/cars/:carId/category/:categoryId/products/',
        name: 'CategoryProduct',
        meta:{layout: 'main', title: 'Alogo | Каталог товаров'},
        component: require('../views/CategoryProduct').default,
        props: true
    },
];

const router = new VueRouter({
    // mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});


export default router
