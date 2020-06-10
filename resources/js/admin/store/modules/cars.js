import axios from "axios";

function initialState () {
    const cars = [];
    const carCount = {};
    const addCarErrors = {
        name: [],
        keywords: [],
        image: []
    }
    const loader = false;
    return {
        cars,
        addCarErrors,
        carCount,
        loader
    }
}

const getters = {
    cars(state)
    {
        return state.cars
    },
    addCarErrorsName(state)
    {
        return state.addCarErrors.name
    },
    addCarErrorsKeywords(state)
    {
        return state.addCarErrors.keywords
    },
    addCarErrorsImage(state)
    {
        return state.addCarErrors.image
    },
    carCount(state)
    {
        return state.carCount
    },
    loader(state)
    {
        return state.loader;
    },
};

const actions = {
    async getAllCars(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/cars',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setCars', resp.data.cars)
                    ctx.commit('setCarCount', resp.data.carCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async addNewCar(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/cars',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddCarErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteCar(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/cars/' + id,
                method: 'DELETE'
            })
                .then((resp) => {
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
    logAddCarErrors(state, addCarErrors)
    {
        state.addCarErrors = addCarErrors
    },
    setCarCount(state, carCount)
    {
        state.carCount = carCount
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
