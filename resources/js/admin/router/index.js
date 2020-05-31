import Vue from 'vue'
import VueRouter from "vue-router";
import store from '../store'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        meta:{layout: 'auth', title: 'Панель Управления | Вход'},
        component: require('../views/Login').default
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta:{layout: 'main', title: 'Панель Управления | Главная'},
        component: require('../views/Dashboard').default
    },
    {
        path: '/users',
        name: 'Users',
        meta:{layout: 'main', title: 'Панель Управления | Пользователи'},
        component: require('../views/Users').default
    },
    {
        path: '/users/edit/:id',
        name: 'UserEdit',
        meta:{layout: 'main', title: 'Панель Управления | Пользователи'},
        component: require('../views/components/users/EditComponent').default,
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

// router.beforeEach((to, from, next) => {
//     if (!to.meta.middleware) {
//         return next()
//     }
//     const middleware = to.meta.middleware;
//     const context = {
//         to,
//         from,
//         next,
//         store
//     };
//     return middleware[0]({
//         ...context,
//         next: middlewarePipeline(context, middleware, 1)
//     })
// });

export default router
