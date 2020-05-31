import axios from "axios";

function initialState () {
    const isAuth = false;
    const loginErrors = {
        phone: [],
        password: []
    }

    return {
        isAuth,
        loginErrors
    }
}

const getters = {
    loginErrorsPhone(state)
    {
        return state.loginErrors.phone
    },
    loginErrorsPassword(state)
    {
        return state.loginErrors.password
    }
};

const actions = {
    async login(ctx, data)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/admin-login',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setIsAuth', true)
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('logLoginErrors', error.response.data.error)
                    reject(error)
                })
        })
    },

    async logout(ctx){
        ctx.commit('setIsAuth', false)
    },


};

const mutations = {
    setIsAuth(state, isAuth)
    {
        state.isAuth = isAuth
    },
    logLoginErrors(state, loginErrors)
    {
        state.loginErrors = loginErrors;
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
