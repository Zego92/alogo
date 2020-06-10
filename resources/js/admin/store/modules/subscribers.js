import axios from "axios";

function initialState () {
    const subscribers = [];
    const subscriberCount = {};
    const loader = false;
    return {
        loader,
        subscribers,
        subscriberCount

    }
}

const getters = {
    loader(state)
    {
        return state.loader;
    },
    subscribers(state)
    {
        return state.subscribers
    },
    subscriberCount(state)
    {
        return state.subscriberCount
    },
};

const actions = {
    async getAllSubscribers(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/subscribers',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setSubscribers', resp.data.subscribers)
                    ctx.commit('setSubscriberCount', resp.data.subscriberCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteSubscriber(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/subscribers/' + id,
                method: 'DELETE',
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
    setSubscribers(state, subscribers)
    {
        state.subscribers = subscribers
    },
    setSubscriberCount(state, subscriberCount)
    {
        state.subscriberCount = subscriberCount
    }

};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
