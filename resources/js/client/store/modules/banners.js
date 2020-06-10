import axios from "axios";

function initialState () {
    const banners = [];
    return {
        banners
    }
}

const getters = {
    banners(state)
    {
        return state.banners
    }
};

const actions = {
    async getAllBanners(ctx, data)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-banners',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setBanners', resp.data.banners)
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },


};

const mutations = {
    setBanners(state, banners)
    {
        state.banners = banners
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
