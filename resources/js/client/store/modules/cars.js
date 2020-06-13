import axios from "axios";

function initialState () {
    const loader = false;
    const cars = [];
    return {
        loader,
        cars
    }
}

const getters = {
    loader(state)
    {
        return state.loader
    },
    cars(state)
    {
        return state.cars
    }
};

const actions = {
    async getAllCars(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-cars',
                method: 'GET',
                data: data
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
    }
};

const mutations = {
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setCars(state, cars)
    {
        state.cars = cars
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
