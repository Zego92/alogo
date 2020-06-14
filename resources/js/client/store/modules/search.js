import axios from "axios";

function initialState () {
    const loader = false;
    const car = {
        category: []
    };
    const getRegion = {};
    const getCountry = {};
    const getManufacturer = {};
    const getModelYear = [];
    const products = [];
    return {
        loader,
        car,
        getRegion,
        getCountry,
        getManufacturer,
        getModelYear,
        products
    }
}

const getters = {
    loader(state)
    {
        return state.loader
    },
    car(state)
    {
        return state.car
    },
    getRegion(state)
    {
        return state.getRegion
    },
    getCountry(state)
    {
        return state.getCountry
    },
    getManufacturer(state)
    {
        return state.getManufacturer
    },
    getModelYear(state)
    {
        return state.getModelYear
    },
    products(state)
    {
        return state.products
    }
};

const actions = {
    async searchByVin(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-search-vin',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    ctx.commit('setCar', resp.data.car)
                    ctx.commit('setRegion', resp.data.getRegion)
                    ctx.commit('setCountry', resp.data.getCountry)
                    ctx.commit('setManufacturer', resp.data.getManufacturer)
                    ctx.commit('setModelYear', resp.data.getModelYear)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async searchByProduct(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-search-product',
                method: 'POST',
                data: data
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
    setCar(state, car)
    {
        state.car = car
    },
    setRegion(state, getRegion)
    {
        state.getRegion = getRegion
    },
    setCountry(state, getCountry)
    {
        state.getCountry = getCountry
    },
    setManufacturer(state, getManufacturer)
    {
        state.getManufacturer = getManufacturer
    },
    setModelYear(state, getModelYear)
    {
        state.getModelYear = getModelYear
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
