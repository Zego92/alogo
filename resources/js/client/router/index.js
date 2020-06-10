import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Main',
        meta:{layout: 'main', title: 'Alogo | Главная'},
        component: require('../views/Main').default
    },
    {
        path: '/cars',
        name: 'Cars',
        meta:{layout: 'main', title: 'Alogo | Автопроизводители'},
        component: require('../views/Cars').default
    },
    {
        path: '/cars/category/:id',
        name: 'CarCategory',
        meta:{layout: 'main', title: 'Alogo | Каталог категорий'},
        component: require('../views/CarCategory').default,
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
