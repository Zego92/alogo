import axios from "axios";

function initialState () {
    const cars = [];
    const categories = [];
    const products = [];
    const loader = false;
    const banners = [];
    const company = [];
    return {
        cars,
        categories,
        loader,
        products,
        banners,
        company
    }
}

const getters = {
    cars(state)
    {
        return state.cars
    },
    categories(state)
    {
        return state.categories
    },
    loader(state)
    {
        return state.loader
    },
    products(state)
    {
        return state.products
    },
    banners(state)
    {
        return state.banners
    },
    company(state)
    {
        return state.company
    }
};

const actions = {
    async getRandomCars(ctx)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/get-random-cars',
                method: 'GET',
            })
                .then((resp) => {
                    ctx.commit('setCars', resp.data.cars)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async getRandomCategory(ctx)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/get-random-category',
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setCategories', resp.data.categories)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async getRandomProducts(ctx)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/get-random-products',
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setProducts', resp.data.products)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async getAllBanners(ctx)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-banners',
                method: 'GET',
            })
                .then((resp) => {
                    ctx.commit('setBanners', resp.data.banners)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async getCompanyInfo(ctx)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/get-company-info',
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setCompany', resp.data.company)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    }

};

const mutations = {
    setCars(state, cars)
    {
        state.cars = cars
    },
    setCategories(state, categories)
    {
        state.categories = categories
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setProducts(state, products)
    {
        state.products = products
    },
    setBanners(state, banners)
    {
        state.banners = banners
    },
    setCompany(state, company)
    {
        state.company = company
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
