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
    return {
        users,
        userCount,
        addUserErrors,
        user,
        updateUserErrors
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


};

const actions = {
    async getAllUsers(ctx, data)
    {
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
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    async addUser(ctx, data)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/users',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('logAddUserErrors', error.response.data.error)
                    reject(error)
                })
        })
    },

    async deleteUser(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/users/' + id,
                method: 'DELETE'
            })
                .then((resp) => {
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    async getUser(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/users/' + id,
                method: 'GET',
            })
                .then((resp) => {
                    ctx.commit('setUser', resp.data.user)
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    async updateUser(ctx, {id, data})
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/users/' + id,
                method: 'PUT',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                })
                .catch((error) => {
                    ctx.commit('logUpdateUserErrors', error.response.data.error)
                    reject(error)
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
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
