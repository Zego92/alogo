import axios from "axios";

function initialState () {
    const categories = [];
    const loader = false;
    return {
        loader,
        categories
    }
}

const getters = {
    loader(state)
    {
        return state.loader
    },
    categories(state)
    {
        return state.categories
    }
};

const actions = {
    async getAllCategory(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-category/' + id,
                method: 'GET',
            })
                .then((resp) => {
                    ctx.commit('setCategories', resp.data.categories)
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
    setCategories(state, categories)
    {
        state.categories = categories
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
