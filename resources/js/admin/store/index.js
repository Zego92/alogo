import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import users from "./modules/users";
import categories from "./modules/categories";
import cars from "./modules/cars";
import products from "./modules/products";
import productGallery from "./modules/productGallery";
import banners from "./modules/banners";
import comments from "./modules/comments";
import company from "./modules/company";
import orders from "./modules/orders";
import feedback from "./modules/feedback";
import subscribers from "./modules/subscribers";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        users,
        categories,
        cars,
        products,
        productGallery,
        banners,
        comments,
        company,
        orders,
        feedback,
        subscribers
    }
})
