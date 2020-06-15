import axios from "axios";

function initialState () {
    const products = {
        cars: {},
        products: []
    };
    const loader = false;
    const product = {
        category: {
            cars: {}
        }
    };
    return {
        loader,
        products,
        product
    }
}

const getters = {
    loader(state)
    {
        return state.loader
    },
    products(state)
    {
        return state.products
    },
    product(state)
    {
        return state.product
    }
};

const actions = {
    async getAllProducts(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-products/' + id,
                method: 'GET',
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

    async getProduct(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: 'get-product/' + id,
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setProduct', resp.data.product)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async getRandomProductsForProduct(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/get-product-random/' + id,
                method: 'GET'
            })
                .then((resp) => {
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
};

const mutations = {
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setProducts(state, products)
    {
        state.products = products
    },
    setProduct(state, product)
    {
        state.product = product
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
