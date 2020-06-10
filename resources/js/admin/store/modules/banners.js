import axios from "axios";

function initialState () {
    const banners = [];
    const bannerCount = {};
    const addBannerErrors = {
        name: [],
        image: []
    }
    const loader = false;
    return {
        loader,
        banners,
        bannerCount,
        addBannerErrors
    }
}

const getters = {
    banners(state)
    {
        return state.banners
    },
    bannerCount(state)
    {
        return state.bannerCount
    },
    addBannerErrorsName(state)
    {
        return state.addBannerErrors.name
    },
    addBannerErrorsImage(state)
    {
        return state.addBannerErrors.image
    },

};

const actions = {
    async getAllBanners(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/banners',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setBanners', resp.data.banners)
                    ctx.commit('setBannerCount', resp.data.bannerCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async addNewBanner(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/banners',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddBannerErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteBanner(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/banners/' + id,
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
    setBanners(state, banners)
    {
        state.banners = banners
    },
    setBannerCount(state, bannerCount)
    {
        state.bannerCount = bannerCount
    },
    logAddBannerErrors(state, addBannerErrors)
    {
        state.addBannerErrors = addBannerErrors
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
