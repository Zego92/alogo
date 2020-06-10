<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Пользователи</h1>
                        </div>
                        <div class="col-sm-6 align-items-end text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#userModal"><i class="fas fa-user-plus"></i> Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="card shadow-lg card-primary">
                                <div class="card-header"></div>
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-head-fixed">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Имя Фамилия</th>
                                            <th>Телефон</th>
                                            <th>Email</th>
                                            <th>Адрес</th>
                                            <th>Действие</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(user, $index) in users" :key="user.id">
                                            <td>{{$index + 1}}</td>
                                            <td>{{user.name}} {{user.surname}}</td>
                                            <td>{{user.email}}</td>
                                            <td>{{user.phone}}</td>
                                            <td v-if="user.address === null">Адрес не указан</td>
                                            <td v-else>{{user.address}}</td>
                                            <td>
                                                <button @click.prevent="onClickDeleteUser(user.id)" class="btn btn-danger btn-sm"><i class="fas fa-user-minus"></i></button>
                                                <router-link :to="{name: 'UserEdit', params: {id: user.id}}"  class="btn btn-info btn-sm"><i class="fas text-white fa-user-cog"></i></router-link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Добавление нового пользователя</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form role="form">
                                <div class="form-group">
                                    <label for="userName">Имя</label>
                                    <input v-model="formData.name" type="text" class="form-control" id="userName" required>
                                    <span v-for="error in addUserErrorsName" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="userSurname">Фамилия</label>
                                    <input v-model="formData.surname" type="text" class="form-control" id="userSurname" required>
                                    <span v-for="error in addUserErrorsSurname" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="userEmail">Email</label>
                                    <input v-model="formData.email" type="email" class="form-control" id="userEmail" required>
                                    <span v-for="error in addUserErrorsEmail" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="userPhone">Телефон</label>
                                    <input v-model="formData.phone" type="tel" class="form-control" v-mask="'+380#########'" id="userPhone" required>
                                    <span v-for="error in addUserErrorsPhone" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="userAddress">Адрес</label>
                                    <input v-model="formData.address" type="text" class="form-control" id="userAddress" required>
                                    <span v-for="error in addUserErrorsAddress" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="userPassword">Пароль</label>
                                    <input v-model="formData.password" type="password" class="form-control" id="userPassword" required>
                                    <span v-for="error in addUserErrorsPassword" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <button @click.prevent="onClickAddUser" class="btn btn-success">Добавить</button>
                                    <button id="modal-close" type="button" class="btn btn-danger" data-dismiss="modal">Закрыть</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import Vue from 'vue'
    import Loader from "../components/Loader";
    export default {
        name: "Users",
        data() {
            return {
                formData:{
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    address: '',
                    password: ''
                }
            }
        },
        components: {Loader},
        computed: {
            ...mapState('users', ['loader']),
            ...mapGetters('users',
                [
                    'users',
                    'addUserErrorsAddress',
                    'addUserErrorsPhone',
                    'addUserErrorsEmail',
                    'addUserErrorsName',
                    'addUserErrorsSurname',
                    'addUserErrorsPassword'
                ])
        },
        methods: {
            ...mapActions('users', ['getAllUsers', 'addUser', 'deleteUser']),
            onClickDeleteUser(id)
            {
                Vue.swal({
                    title: 'Подтвердите действие',
                    text: 'Данные будут удалены безвозвратно!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Да, Удалить!',
                    cancelButtonText: 'Отменить'
                }).then((result) => {
                    if (result.value){
                        this.deleteUser(id)
                        this.$swal('Успех!', 'Пользователь успешно удален.', 'success')
                    }
                    this.getAllUsers();
                })
            },
            onClickAddUser()
            {
                this.addUser(this.formData)
                .then((resp) => {
                    document.getElementById('modal-close').click();
                    Vue.swal({
                        toast:true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: 'success',
                        title: resp.data.message
                    })
                    this.getAllUsers()
                    this.clearFormData()
                    $('#userModal').modal('hide')
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
                    password: ''
                }
            },
        },
        mounted() {
            this.getAllUsers()
        }
    }
</script>

<style scoped>

</style>
