<template>
    <div>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark"></h1>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <span class="h4">Информация о заказе {{order.order_number}}</span>
                                </div>
                                <div class="card-body table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th colspan="3">Статус</th>
                                            <th colspan="3" v-if="order.status === '1'"><button class="btn btn-primary disabled">Принят</button></th>
                                            <th colspan="3" v-if="order.status === '2'"><button class="btn btn-warning disabled">Обрабатывается</button></th>
                                            <th colspan="3" v-if="order.status === '3'"><button class="btn btn-success disabled">Выполнен</button></th>
                                        </tr>
<!--                                        <tr >-->
<!--                                            <th colspan="3">Заказанные товары</th>-->
<!--                                            <th colspan="3">Название:  | Цена:   | Колличество: </th>-->
<!--                                        </tr>-->
                                        <tr>
                                            <th colspan="3">Сумма заказа</th>
                                            <th colspan="3">{{order.total}} UAH</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Комментарий к заказу</th>
                                            <th colspan="3" v-if="order.comment === null"><button class="btn btn-danger disabled">Комментарий к заказу отсутствует</button></th>
                                            <th colspan="3" v-else>{{order.comment}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Создан</th>
                                            <th colspan="3">{{order.created_at  | moment("DD MMMM YYYY")}} Года</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <span class="h4">Заказанные товары</span>
                                </div>
                                <div class="card-body table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Название</th>
                                            <th>Кол-во</th>
                                            <th>Цена</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(product, $index) in order.order_products">
                                            <td>{{ $index + 1}}</td>
                                            <td>{{product.name}}</td>
                                            <td>{{product.quantity}} шт</td>
                                            <td>{{product.price}} UAH</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <span class="h4">Изменение статуса заказа</span>
                                </div>
                                <div class="card-body">
                                    <form role="form">
                                        <div class="form-group">
                                            <label for="orderStatus">Выберите статус</label>
                                            <select v-model="formData.status" id="orderStatus" class="form-control">
                                                <option value="1">Принят</option>
                                                <option value="2">Обрабатывается</option>
                                                <option value="3">Выполнен</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <button @click.prevent="onCLickChangeOrderStatus(id)" class="btn btn-block btn-success">Изменить</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <span class="h4">Контактная информация пользователя</span>
                                </div>
                                <div class="card-body table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th colspan="3">Имя</th>
                                            <th colspan="3">{{order.user.name}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Фамилия</th>
                                            <th colspan="3">{{order.user.surname}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Телефон</th>
                                            <th colspan="3">{{order.user.phone}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Email</th>
                                            <th colspan="3">{{order.user.email}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Адрес</th>
                                            <th colspan="3">{{order.user.address}}</th>
                                        </tr>
                                        </thead>
                                    </table>
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
    const moment = require('moment')
    require('moment/locale/ru')
    import Vue from 'vue'
    Vue.use(require('vue-moment'), {
        moment
    })
    export default {
        props: ['id'],
        name: "EditComponent",
        data() {
            return {
                formData: {
                    status: ''
                }
            }
        },
        components: {},
        computed: {
            ...mapGetters('orders', ['order'])
        },
        methods: {
            ...mapActions('orders', ['showOrder', 'updateOrder']),
            onCLickChangeOrderStatus()
            {
                this.updateOrder({
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
                        this.showOrder(this.$props.id)
                    })
                    .catch((error) => {
                        Vue.swal({
                            toast:true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            icon: 'error',
                            title: error.response.data.error
                        })
                    })
            }
        },
        mounted() {
            this.showOrder(this.$props.id)
        }
    }
</script>

<style scoped>

</style>
