import Vue from 'vue'
import Vuex from 'vuex'
import banners from "./modules/banners";
import subscribers from "./modules/subscribers";
import main from "./modules/main";
import auth from "./modules/auth";
import feedback from "./modules/feedback";
import cars from "./modules/cars";
import category from "./modules/category";
import products from "./modules/products";
import search from "./modules/search";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        banners,
        subscribers,
        main,
        auth,
        feedback,
        cars,
        category,
        products,
        search
    }
})
