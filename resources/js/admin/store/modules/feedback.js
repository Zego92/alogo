import axios from "axios";

function initialState () {
    const feedback = [];
    const feedbackCount = {};
    const loader = false;
    return {
        feedback,
        feedbackCount,
        loader
    }
}

const getters = {
    loader(state)
    {
        return state.loader;
    },
    feedback(state)
    {
        return state.feedback
    },
    feedbackCount(state)
    {
        return state.feedbackCount
    },

};

const actions = {
    async getAllFeedback(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/feedback',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setFeedback', resp.data.feedback)
                    ctx.commit('setFeedbackCount', resp.data.feedbackCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteFeedback(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/feedback/' + id,
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
    setFeedback(state, feedback)
    {
        state.feedback = feedback
    },
    setFeedbackCount(state, feedbackCount)
    {
        state.feedbackCount = feedbackCount
    },

};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
