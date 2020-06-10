import axios from "axios";

function initialState () {
    const cars = [];
    return {
        cars
    }
}

const getters = {
    cars(state)
    {
        return state.cars
    }
};

const actions = {
    async getRandomCars(ctx)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/get-random-cars',
                method: 'GET',
            })
                .then((resp) => {
                    ctx.commit('setCars', resp.data.cars)
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },


};

const mutations = {
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
