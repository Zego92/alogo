import Vue from 'vue'
import Vuex from 'vuex'
import banners from "./modules/banners";
import subscribers from "./modules/subscribers";
import main from "./modules/main";
import auth from "./modules/auth";
import feedback from "./modules/feedback";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        banners,
        subscribers,
        main,
        auth,
        feedback
    }
})
