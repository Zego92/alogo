import axios from "axios";

function initialState () {
    const loader = false;
    const addNewSubscriberErrors = {
        email: []
    }
    return {
        loader,
        addNewSubscriberErrors
    }
}

const getters = {
    loader(state)
    {
        return state.loader
    },
    addNewSubscriberErrorsEmail(state)
    {
        return state.addNewSubscriberErrors.email
    }
};

const actions = {
    async addNewSubscriber(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-subscribers',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddNewSubscriberErrors', error.response.data.error)
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
    logAddNewSubscriberErrors(state, addNewSubscriberErrors)
    {
        state.addNewSubscriberErrors = addNewSubscriberErrors
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
