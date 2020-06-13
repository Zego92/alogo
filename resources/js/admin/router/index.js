import Vue from 'vue'
import VueRouter from "vue-router";
import store from "../store";
import auth from "./middleware/auth";
import guest from "./middleware/guest";
import middlewarePipeline from './middlewarePipeline'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        meta:{layout: 'auth', title: 'Панель Управления | Вход', middleware: [guest]},
        component: require('../views/Login').default
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta:{layout: 'main', title: 'Панель Управления | Главная', middleware: [auth]},
        component: require('../views/Dashboard').default
    },
    {
        path: '/users',
        name: 'Users',
        meta:{layout: 'main', title: 'Панель Управления | Пользователи', middleware: [auth]},
        component: require('../views/Users').default
    },
    {
        path: '/users/edit/:id',
        name: 'UserEdit',
        meta:{layout: 'main', title: 'Панель Управления | Пользователи', middleware: [auth]},
        component: require('../views/components/users/EditComponent').default,
        props: true
    },
    {
        path: '/category',
        name: 'Category',
        meta:{layout: 'main', title: 'Панель Управления | Категории', middleware: [auth]},
        component: require('../views/Categories').default
    },
    {
        path: '/category/edit/:id',
        name: 'CategoryEdit',
        meta:{layout: 'main', title: 'Панель Управления | Категории', middleware: [auth]},
        component: require('../views/components/categories/EditComponent').default,
        props: true
    },
    {
        path: '/product',
        name: 'Product',
        meta:{layout: 'main', title: 'Панель Управления | Товары', middleware: [auth]},
        component: require('../views/Products').default
    },
    {
        path: '/product/edit/:id',
        name: 'ProductEdit',
        meta:{layout: 'main', title: 'Панель Управления | Товары', middleware: [auth]},
        component: require('../views/components/products/EditComponent').default,
        props: true
    },
    {
        path: '/cars',
        name: 'Cars',
        meta:{layout: 'main', title: 'Панель Управления | Автомобили', middleware: [auth]},
        component: require('../views/Cars').default
    },
    {
        path: '/banners',
        name: 'Banners',
        meta:{layout: 'main', title: 'Панель Управления | Банеры', middleware: [auth]},
        component: require('../views/Banners').default
    },
    {
        path: '/feedback',
        name: 'Feedback',
        meta:{layout: 'main', title: 'Панель Управления | Обратная связь', middleware: [auth]},
        component: require('../views/Feedback').default
    },
    {
        path: '/comments',
        name: 'Comments',
        meta:{layout: 'main', title: 'Панель Управления | Комментарии', middleware: [auth]},
        component: require('../views/Comments').default
    },
    {
        path: '/company',
        name: 'Company',
        meta:{layout: 'main', title: 'Панель Управления | О нас', middleware: [auth]},
        component: require('../views/Company').default
    },
    {
        path: '/company/edit/:id',
        name: 'CompanyEdit',
        meta:{layout: 'main', title: 'Панель Управления | О нас', middleware: [auth]},
        component: require('../views/components/company/EditComponent').default,
        props: true
    },
    {
        path: '/subscribers',
        name: 'Subscribers',
        meta:{layout: 'main', title: 'Панель Управления | Подписчики', middleware: [auth]},
        component: require('../views/Subscribers').default
    },
    {
        path: '/orders',
        name: 'Orders',
        meta:{layout: 'main', title: 'Панель Управления | Заказы', middleware: [auth]},
        component: require('../views/Orders').default
    },
    {
        path: '/orders/edit/:id',
        name: 'OrderEdit',
        meta:{layout: 'main', title: 'Панель Управления | Заказы', middleware: [auth]},
        component: require('../views/components/orders/EditComponent').default,
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
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware;
    const context = {
        to,
        from,
        next,
        store
    };
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
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
