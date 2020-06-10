import axios from "axios";

function initialState () {
    const comments = [];
    const commentCount = {};
    const loader = false;
    return {
        loader,
        comments,
        commentCount
    }
}

const getters = {
    comments(state)
    {
        return state.comments
    },
    commentCount(state)
    {
        return state.commentCount
    },
    loader(state)
    {
        return state.loader
    }
};

const actions = {
    async getAllComments(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/comments',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setComments', resp.data.comments)
                    ctx.commit('setCommentCount', resp.data.commentCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteComment(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/comments/' + id,
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
    setComments(state, comments)
    {
        state.comments = comments
    },
    setCommentCount(state, commentCount)
    {
        state.commentCount = commentCount
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
