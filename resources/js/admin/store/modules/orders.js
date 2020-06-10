import axios from "axios";

function initialState () {
    const orders = [];
    const orderCount = {};
    const orderProducts = [];
    const order = {
        orderProduct: [],
        user: {}
    };
    const loader = false;
    return {
        orders,
        orderCount,
        orderProducts,
        order,
        loader
    }
}

const getters = {
    loader(state)
    {
        return state.loader;
    },
    orders(state)
    {
        return state.orders
    },
    orderCount(state)
    {
        return state.orderCount
    },
    orderProducts(state)
    {
        return state.orderProducts;
    },
    order(state)
    {
        return state.order
    }
};

const actions = {
    async getAllOrders(ctx, data)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/orders',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setOrders', resp.data.orders);
                    ctx.commit('setOrderCount', resp.data.orderCount);
                    resolve(resp);
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error);
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async addNewOrder(ctx, data)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/orders',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    resolve(resp);
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error);
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async addNewOrderProducts(ctx, data)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/admin-order-product',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp);
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error);
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteOrder(ctx, id)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/orders/' + id,
                method: 'DELETE'
            })
                .then((resp) => {
                    resolve(resp);
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error);
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async showOrder(ctx, id)
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/orders/' + id,
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setOrder', resp.data.order);
                    resolve(resp);
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error);
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async updateOrder(ctx, {id, data})
    {
        ctx.commit('setIsLoad', true);
        return new Promise((resolve, reject) => {
            axios({
                url: '/orders/' + id,
                data: data,
                method: 'PUT'
            })
                .then((resp) => {
                    resolve(resp);
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error);
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async updateOrderStatus(ctx, data)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/orders-update-status',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

};

const mutations = {
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setOrders(state, orders)
    {
        state.orders = orders
    },
    setOrderCount(state, orderCount)
    {
        state.orderCount = orderCount
    },
    setOrderProduct(state, orderProducts)
    {
        state.orderProduct = orderProducts;
    },
    addProduct(state, payload) {
        state.orderProducts.push(payload);
    },
    removeOrder(state, payload) {
        state.orderProducts = state.orderProducts.filter(order => order.productId !== payload)
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
    setOrder(state, order)
    {
        state.order = order
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
