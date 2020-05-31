<template>
    <div>
        <div class="content-wrapper mt-5" style="min-height: 855px;">
            <section class="content mt-5">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header">
                                    <span class="h4">Информация о пользователе {{user.name}} {{user.surname}}</span>
                                </div>
                                <div class="card-body table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th colspan="3">Имя Фамилия</th>
                                            <th colspan="3">{{user.name}} {{user.surname}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Телефон</th>
                                            <th colspan="3">{{user.phone}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Email</th>
                                            <th colspan="3">{{user.email}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Адрес</th>
                                            <th colspan="3" v-if="user.address === null">Адрес не указан</th>
                                            <th colspan="3" v-else>{{user.address}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Создан</th>
                                            <th colspan="3">{{user.created_at | moment("DD MMMM YYYY")}} Года</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Обновлен</th>
                                            <th colspan="3">{{user.updated_at | moment("DD MMMM YYYY")}} Года</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header">
                                    <span class="h4">Редактирование информации</span>
                                </div>
                                <div class="card-body">
                                    <form role="form">
                                        <div class="form-group">
                                            <label for="userName">Имя</label>
                                            <input v-model="formData.name" type="text" class="form-control" id="userName" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="userSurname">Фамилия</label>
                                            <input v-model="formData.surname" type="text" class="form-control" id="userSurname" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="userEmail">Email</label>
                                            <input v-model="formData.email" type="email" class="form-control" id="userEmail" required>
                                            <span v-for="error in updateUserErrorsEmail" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="userPhone">Телефон</label>
                                            <input v-model="formData.phone" type="tel" class="form-control" v-mask="'+380#########'" id="userPhone" required>
                                            <span v-for="error in updateUserErrorsPhone" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="userAddress">Адрес</label>
                                            <input v-model="formData.address" type="text" class="form-control" id="userAddress" required>
                                        </div>
                                        <div class="form-group">
                                            <button @click.prevent="onClickUpdateUser" class="btn btn-success">Обновить</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header">
                                    <span class="h4">Заказы пользователя</span>
                                </div>
                                <div class="card-body">
                                    <ul class="list-group list-group-flush" >
                                        <li class="list-group-item"><span class="font-weight-bold">Номер заказа:</span> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Vue from 'vue'
    const moment = require('moment')
    require('moment/locale/ru')
    Vue.use(require('vue-moment'), {
        moment
    })
    export default {
        props: ['id'],
        name: "EditComponent",
        data() {
            return {
                formData:{
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    address: '',
                }
            }
        },
        components: {},
        computed: {
            ...mapGetters('users', ['user', 'updateUserErrorsEmail', 'updateUserErrorsPhone'])
        },
        methods: {
            ...mapActions('users', ['getUser', 'updateUser']),
            onClickUpdateUser()
            {
                this.updateUser({
                    id: this.$props.id,
                    data: this.formData
                })
                .then((resp) => {
                    Vue.swal({
                        toast:true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: 'success',
                        title: resp.data.message
                    })
                    this.$store.commit('users/logUpdateUserErrors', '')
                    this.clearFormData()
                    this.getUser(this.$props.id)
                })
            },
            clearFormData()
            {
                this.formData = {
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    address: '',
                }
            },

        },
        mounted() {
            this.getUser(this.$props.id)
        }
    }
</script>

<style scoped>

</style>
