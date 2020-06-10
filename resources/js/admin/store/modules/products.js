import axios from "axios";

function initialState () {
    const products = [];
    const product = {
        category: {
            cars: {}
        },
        images: []
    };
    const productCount = {};
    const loader = false;
    const addProductErrors = {
        categoryId: [],
        name: [],
        brand: [],
        article: [],
        price: [],
        status: [],
        description: [],
        image: [],
        keywords: []
    }
    const updateProductErrors = {
        name: []
    }
    return {
        products,
        productCount,
        loader,
        addProductErrors,
        product,
        updateProductErrors
    }
}

const getters = {
    products(state)
    {
        return state.products
    },
    productCount(state)
    {
        return state.productCount
    },
    loader(state)
    {
        return state.loader
    },
    addProductErrorsCats(state)
    {
        return state.addProductErrors.categoryId
    },
    addProductErrorsName(state)
    {
        return state.addProductErrors.name
    },
    addProductErrorsBrand(state)
    {
        return state.addProductErrors.brand
    },
    addProductErrorsArticle(state)
    {
        return state.addProductErrors.article
    },
    addProductErrorsPrice(state)
    {
        return state.addProductErrors.price
    },
    addProductErrorsStatus(state)
    {
        return state.addProductErrors.status
    },
    addProductErrorsDescription(state)
    {
        return state.addProductErrors.description
    },
    addProductErrorsImage(state)
    {
        return state.addProductErrors.image
    },
    addProductErrorsKeywords(state)
    {
        return state.addProductErrors.keywords
    },
    product(state)
    {
        return state.product
    },
    updateProductErrorsName(state)
    {
        return state.updateProductErrors.name
    }

};

const actions = {
    async getAllProducts(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/products',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setProducts', resp.data.products)
                    ctx.commit('setProductCount', resp.data.productCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async addNewProduct(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/products',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddProductErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async updateProductStatus(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/product-update-status',
                method: 'POST',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setIsLoad', false)
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async editProduct(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/products/' + id,
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setProduct', resp.data.product)
                    resolve(resp)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    async updateProduct(ctx, {id, data})
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/products/' + id,
                method: 'PUT',
                data: data,
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logUpdateProductErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteProduct(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/products/' + id,
                method: 'DELETE'
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
    setProducts(state, products)
    {
        state.products = products
    },
    setProductCount(state, productCount)
    {
        state.productCount = productCount;
    },
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    logAddProductErrors(state, addProductErrors)
    {
        state.addProductErrors = addProductErrors
    },
    setProduct(state, product)
    {
        state.product = product;
    },
    logUpdateProductErrors(state, updateProductErrors)
    {
        state.updateProductErrors = updateProductErrors
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
