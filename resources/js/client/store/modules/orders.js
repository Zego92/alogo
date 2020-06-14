import axios from "axios";

function initialState () {
    const orderProducts = [];
    const loader = false;
    return{
        orderProducts,
        loader
    }
}

const getters = {
    orderProducts(state)
    {
        return state.orderProducts;
    },
};

const actions = {
    async addNewOrder(ctx, data)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-order',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false);
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false);
                })
        })
    },
    async addNewOrderProducts(ctx, data)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/client-order-product',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false);
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false);
                })
        })
    },
};

const mutations = {
    removeOrder(state, payload) {
        state.orderProducts = state.orderProducts.filter(order => order.productId !== payload)
    },
    setOrderProduct(state, orderProducts)
    {
        state.orderProduct = orderProducts;
    },
    addProduct(state, payload) {
        state.orderProducts.push(payload);
    },
    incrementProductQuantity(state, payload) {
        state.orderProducts.find(product => product.productId === payload).quantity ++;
    },
    decrementProductQuantity(state, payload) {
        state.orderProducts.find(product => product.productId === payload).quantity --;
    },
    clearOrder(state, payload) {
        state.orderProducts = [];
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
