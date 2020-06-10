import axios from "axios";

function initialState () {
    const categories = [];
    const categoryCount = {};
    const addCategoryErrors = {
        parent_id: [],
        car_id: [],
        name: [],
        keywords: [],
        image: [],
    }
    const carCategories = [];
    const loader = false;
    return {
        addCategoryErrors,
        categories,
        categoryCount,
        loader,
        carCategories
    }
}

const getters = {
    addCategoryErrorsParent(state)
    {
        return state.addCategoryErrors.parentId
    },
    addCategoryErrorsCar(state)
    {
        return state.addCategoryErrors.carId
    },
    addCategoryErrorsName(state)
    {
        return state.addCategoryErrors.name
    },
    addCategoryErrorsImage(state)
    {
        return state.addCategoryErrors.image
    },
    addCategoryErrorsKeywords(state)
    {
        return state.addCategoryErrors.keywords
    },
    categories(state)
    {
        return state.categories
    },
    categoryCount(state)
    {
        return state.categoryCount
    },
    loader(state)
    {
        return state.loader;
    },
    carCategories(state)
    {
        return state.carCategories
    }

};

const actions = {
    async getAllCategories(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/category',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setCategories', resp.data.categories)
                    ctx.commit('setCategoryCount', resp.data.categoryCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async addNewCategory(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/category',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddCategoryErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteCategory(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/category/' + id,
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
    },

    async getCarCategories(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/category/' + id,
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setCarCategories', resp.data.carCategories)
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

};

const mutations = {
    logAddCategoryErrors(state, addCategoryErrors)
    {
        state.addCategoryErrors = addCategoryErrors
    },
    setCategories(state, categories)
    {
        state.categories = categories
    },
    setCategoryCount(state, categoryCount)
    {
        state.categoryCount = categoryCount
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setCarCategories(state, carCategories)
    {
        state.carCategories = carCategories
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
