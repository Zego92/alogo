import axios from "axios";

function initialState () {
    const addImageErrors = {
        image: []
    };
    const loader = false;
    return {
        loader,
        addImageErrors
    }
}

const getters = {
    loader(state)
    {
        return state.loader
    },
    addImageErrorsImage(state)
    {
        return state.addImageErrors.image
    }
};

const actions = {
    async addNewProductImage(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/product-gallery',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddImageErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteProductImage(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/product-gallery/' + id,
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
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    logAddImageErrors(state, addImageErrors)
    {
        state.addImageErrors = addImageErrors;
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
