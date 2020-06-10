import axios from "axios";

function initialState () {
    const users = [];
    const userCount = {};
    const addUserErrors = {
        address: [],
        phone: [],
        email: [],
        name: [],
        surname: [],
        password: [],
    }
    const user = {};
    const updateUserErrors = {
        email: [],
        phone: []
    }
    const loader = false;
    return {
        users,
        userCount,
        addUserErrors,
        user,
        updateUserErrors,
        loader
    }
}

const getters = {
    users(state)
    {
        return state.users
    },
    userCount(state)
    {
        return state.userCount
    },
    addUserErrorsAddress(state)
    {
        return state.addUserErrors.address
    },
    addUserErrorsPhone(state)
    {
        return state.addUserErrors.phone
    },
    addUserErrorsEmail(state)
    {
        return state.addUserErrors.email
    },
    addUserErrorsName(state)
    {
        return state.addUserErrors.name
    },
    addUserErrorsSurname(state)
    {
        return state.addUserErrors.surname
    },
    addUserErrorsPassword(state)
    {
        return state.addUserErrors.password
    },
    user(state)
    {
        return state.user
    },
    updateUserErrorsEmail(state)
    {
        return state.updateUserErrors.email
    },
    updateUserErrorsPhone(state)
    {
        return state.updateUserErrors.phone
    },
    loader(state)
    {
        return state.loader;
    },
};

const actions = {
    async getAllUsers(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/users',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setUsers', resp.data.users)
                    ctx.commit('setUserCount', resp.data.userCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async addUser(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/users',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddUserErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteUser(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/users/' + id,
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

    async getUser(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/users/' + id,
                method: 'GET',
            })
                .then((resp) => {
                    ctx.commit('setUser', resp.data.user)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },
    async updateUser(ctx, {id, data})
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/users/' + id,
                method: 'PUT',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logUpdateUserErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    }

};

const mutations = {
    setUsers(state, users)
    {
        state.users = users
    },
    setUserCount(state, userCount)
    {
        state.userCount = userCount
    },
    logAddUserErrors(state, addUserErrors)
    {
        state.addUserErrors = addUserErrors
    },
    setUser(state, user)
    {
        state.user = user;
    },
    logUpdateUserErrors(state, updateUserErrors)
    {
        state.updateUserErrors = updateUserErrors
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
