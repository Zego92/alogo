import axios from "axios";

function initialState () {
    const products = {
        cars: {},
        products: []
    };
    const loader = false;
    return {
        loader,
        products,
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
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
