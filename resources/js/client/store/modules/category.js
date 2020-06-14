import axios from "axios";

function initialState () {
    const categories = [];
    const allCategory = []
    const loader = false;
    return {
        loader,
        categories,
        allCategory
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
    },
    allCategory(state)
    {
        return state.allCategory
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
    },

    async getCategories(ctx)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '',
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setAllCategory', resp.data.allCategory)
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
    },
    setAllCategory(state, allCategory)
    {
        state.allCategory = allCategory
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
