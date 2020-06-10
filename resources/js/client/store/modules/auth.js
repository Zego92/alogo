import axios from "axios";

function initialState () {
    const user = '';
    const isAuth = false;
    const loginErrors = {
        phone: [],
        password: []
    };
    const registerErrors = {
        name: [],
        surname: [],
        email: [],
        phone: [],
        address: [],
        password: []
    };
    const loader = false;
    return {
        user,
        loginErrors,
        registerErrors,
        loader,
        isAuth
    }
}

const getters = {
    user(state)
    {
        return state.user
    },
    loginErrorsPhone(state)
    {
        return state.loginErrors.phone
    },
    loginErrorsPassword(state)
    {
        return state.loginErrors.password
    },
    registerErrorsName(state)
    {
        return state.registerErrors.name
    },
    registerErrorsSurname(state)
    {
        return state.registerErrors.surname
    },
    registerErrorsEmail(state)
    {
        return state.registerErrors.email
    },
    registerErrorsPhone(state)
    {
        return state.registerErrors.phone
    },
    registerErrorsAddress(state)
    {
        return state.registerErrors.address
    },
    registerErrorsPassword(state)
    {
        return state.registerErrors.password
    },
    loader(state)
    {
        return state.loader
    },
    isAuth(state)
    {
        return state.isAuth
    }
};

const actions = {
    async login(ctx, data)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-login',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setUser', resp.data.user);
                    ctx.commit('setIsAuth', true);
                    resolve(resp);
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logLoginErrors', error.response.data.error);
                    reject(error);
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async register(ctx, data)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-register',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setUser', resp.data.user);
                    ctx.commit('setIsAuth', true);
                    resolve(resp);
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logRegisterErrors', error.response.data.error);
                    reject(error);
                    ctx.commit('setIsLoad', false)
                })
        })
    }
};

const mutations = {
    setUser(state, user)
    {
        state.user = user;
        localStorage.setItem('userId', user.id)
    },
    logLoginErrors(state, loginErrors)
    {
        state.loginErrors = loginErrors
    },
    logRegisterErrors(state, registerErrors)
    {
        state.registerErrors = registerErrors
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setIsAuth(state, isAuth)
    {
        state.isAuth = isAuth
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
