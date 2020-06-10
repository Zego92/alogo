import axios from "axios";

function initialState () {
    const loader = false;
    const addFeedbackErrors = {
        name: [],
        phone: [],
        email: [],
        title: [],
        description: [],
    };
    return {
        loader,
        addFeedbackErrors
    }
}

const getters = {
    loader(state)
    {
        return state.loader
    },
    addFeedbackErrorsName(state)
    {
        return state.addFeedbackErrors.name
    },
    addFeedbackErrorsPhone(state)
    {
        return state.addFeedbackErrors.phone
    },
    addFeedbackErrorsEmail(state)
    {
        return state.addFeedbackErrors.email
    },
    addFeedbackErrorsTitle(state)
    {
        return state.addFeedbackErrors.title
    },
    addFeedbackErrorsDescription(state)
    {
        return state.addFeedbackErrors.description
    },




};

const actions = {
    async addNewFeedback(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-feedback',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddFeedbackErrors', error.response.data.error)
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
    logAddFeedbackErrors(state, addFeedbackErrors)
    {
        state.addFeedbackErrors = addFeedbackErrors
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
