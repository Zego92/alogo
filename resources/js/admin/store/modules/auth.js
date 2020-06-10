import axios from "axios";

function initialState () {
    const isAuth = false;
    const user = '';
    const loginErrors = {
        phone: [],
        password: []
    }

    return {
        isAuth,
        loginErrors,
        user
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
    },
    user(state)
    {
        return state.user
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
                    ctx.commit('setUser', resp.data.user)
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
    },
    setUser(state, user)
    {
        state.user = user
        localStorage.setItem('userId', user.id)
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
