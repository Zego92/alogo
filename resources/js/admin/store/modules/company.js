import axios from "axios";

function initialState () {
    const companies = [];
    const company = {};
    const companyCount = {};
    const addCompanyErrors = {
        description: [],
        phone1: [],
        phone2: [],
        phone3: [],
        phone4: [],
        phone5: [],
        email: [],
        address: [],
        location: [],
        startTimeWork: [],
        endTimeWork: [],
    }
    const updateCompanyErrors = {
        phone1: [],
        phone2: [],
        phone3: [],
        phone4: [],
        phone5: [],
        email: [],
    }
    const loader = false;
    return {
        loader,
        companies,
        companyCount,
        addCompanyErrors,
        company,
        updateCompanyErrors
    }
}

const getters = {
    loader(state)
    {
        return state.loader;
    },
    companies(state)
    {
        return state.companies
    },
    companyCount(state)
    {
        return state.companyCount
    },
    addCompanyErrorsDescription(state)
    {
        return state.addCompanyErrors.description
    },
    addCompanyErrorsPhone1(state)
    {
        return state.addCompanyErrors.phone1
    },
    addCompanyErrorsPhone2(state)
    {
        return state.addCompanyErrors.phone2
    },
    addCompanyErrorsPhone3(state)
    {
        return state.addCompanyErrors.phone3
    },
    addCompanyErrorsPhone4(state)
    {
        return state.addCompanyErrors.phone4
    },
    addCompanyErrorsPhone5(state)
    {
        return state.addCompanyErrors.phone5
    },
    addCompanyErrorsEmail(state)
    {
        return state.addCompanyErrors.email
    },
    addCompanyErrorsAddress(state)
    {
        return state.addCompanyErrors.address
    },
    addCompanyErrorsLocation(state)
    {
        return state.addCompanyErrors.location
    },
    addCompanyErrorsStartTimeWork(state)
    {
        return state.addCompanyErrors.startTimeWork
    },
    addCompanyErrorsEndTimeWork(state)
    {
        return state.addCompanyErrors.endTimeWork
    },
    company(state)
    {
        return state.company
    },
    updateCompanyErrorsPhone1(state)
    {
        return state.updateCompanyErrors.phone1
    },
    updateCompanyErrorsPhone2(state)
    {
        return state.updateCompanyErrors.phone2
    },
    updateCompanyErrorsPhone3(state)
    {
        return state.updateCompanyErrors.phone3
    },
    updateCompanyErrorsPhone4(state)
    {
        return state.updateCompanyErrors.phone4
    },
    updateCompanyErrorsPhone5(state)
    {
        return state.updateCompanyErrors.phone5
    },
    updateCompanyErrorsEmail(state)
    {
        return state.updateCompanyErrors.email
    },
};

const actions = {
    async getAllCompany(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/company',
                method: 'GET',
                data: data,
            })
                .then((resp) => {
                    ctx.commit('setCompanies', resp.data.companies)
                    ctx.commit('setCompanyCount', resp.data.companyCount)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async addNewCompany(ctx, data)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/company',
                method: 'POST',
                data: data
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logAddCompanyErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async updateCompany(ctx, {id, data})
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/company/' + id,
                method: 'PUT',
                data: data,
            })
                .then((resp) => {
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    ctx.commit('logUpdateCompanyErrors', error.response.data.error)
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async editCompany(ctx, id)
    {
        ctx.commit('setIsLoad', true)
        return new Promise((resolve, reject) => {
            axios({
                url: '/company/' + id,
                method: 'GET'
            })
                .then((resp) => {
                    ctx.commit('setCompany', resp.data.company)
                    resolve(resp)
                    ctx.commit('setIsLoad', false)
                })
                .catch((error) => {
                    reject(error)
                    ctx.commit('setIsLoad', false)
                })
        })
    },

    async deleteCompany(ctx, id)
    {
        return new Promise((resolve, reject) => {
            axios({
                url: '/company/' + id,
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
    setIsLoad(state, loader)
    {
        state.loader = loader
    },
    setCompanies(state, companies)
    {
        state.companies = companies
    },
    setCompanyCount(state, companyCount)
    {
        state.companyCount = companyCount
    },
    logAddCompanyErrors(state, addCompanyErrors)
    {
        state.addCompanyErrors = addCompanyErrors
    },
    setCompany(state, company)
    {
        state.company = company
    },
    logUpdateCompanyErrors(state, updateCompanyErrors)
    {
        state.updateCompanyErrors = updateCompanyErrors;
    }
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
