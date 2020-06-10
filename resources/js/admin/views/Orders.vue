<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Заказы</h1>
                        </div>
                        <div class="col-sm-6 align-items-end text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#orderModal">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row align-center justify-content-center align-items-center">
                        <div class="col-10">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header"></div>
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-head-fixed">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Номер Заказа</th>
                                            <th>Сатус</th>
                                            <th>Сумма Заказа</th>
                                            <th>Действие</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(order, $index) in orders" :key="order.id">
                                            <td>{{$index + 1}}</td>
                                            <td>{{order.order_number}}</td>
<!--                                            <td v-if="order.status === '1'"><button class="btn btn-sm btn-primary disabled">Принят</button></td>-->
<!--                                            <td v-if="order.status === '2'"><button class="btn btn-sm btn-info disabled">Обрабатывается</button></td>-->
<!--                                            <td v-if="order.status === '3'"><button class="btn btn-sm btn-success disabled">Выполнен</button></td>-->
                                            <td>
                                                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                                    <button v-if="order.status === '1'" class="btn btn-primary btn-sm text-white">Принят</button>
                                                    <button v-if="order.status === '2'" class="btn btn-info btn-sm text-white">Обрабатывается</button>
                                                    <button v-if="order.status === '3'" class="btn btn-success btn-sm text-white">Выполнен</button>
                                                    <div class="btn-group" role="group">
                                                        <button v-if="order.status === '1'" id="btnGroupDrop1" class="btn btn-primary dropdown-toggle btn-sm text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                        <button v-if="order.status === '2'" id="btnGroupDrop1" class="btn btn-info dropdown-toggle btn-sm text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                        <button v-if="order.status === '3'" id="btnGroupDrop1" class="btn btn-success dropdown-toggle btn-sm text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1" style="cursor: pointer">
                                                            <option @click.prevent="onClickChangeStatus(order.id, $event)" class="dropdown-item" value="1">Принят</option>
                                                            <option @click.prevent="onClickChangeStatus(order.id, $event)" class="dropdown-item" value="2">Обрабатывается</option>
                                                            <option @click.prevent="onClickChangeStatus(order.id, $event)" class="dropdown-item" value="3">Выполнен</option>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>{{order.total}} UAH</td>
                                            <td>
                                                <button @click.prevent="onClickDeleteOrder(order.id)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                                <router-link :to="{name: 'OrderEdit', params:{id: order.id}}"  class="btn btn-info btn-sm"><i class="fas fa-info-circle"></i></router-link>
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
            <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Добавление нового заказа</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <form class="row">
                                            <div class="form-group col-md-6">
                                                <label for="userOrder">Выбор пользователя</label>
                                                <select id="userOrder" class="form-control" v-model="formData.userId">
                                                    <option v-for="user in users" :key="user.id" :value="user.id">{{user.name}} - {{user.phone}}</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label for="statusOrder">Статус заказа</label>
                                                <select id="statusOrder" class="form-control" v-model="formData.status">
                                                    <option value="1">Принят</option>
                                                    <option value="2">В работе</option>
                                                    <option value="3">Выполнен</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-md-8">
                                        <span class="h5 mb-2">Добавленные товары</span>
                                        <table class="table table-bordered table-striped text-center">
                                            <thead>
                                            <tr>
                                                <th>Название</th>
                                                <th>Цена</th>
                                                <th>Колличество</th>
                                                <th>Действие</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="(item, index) in orderProducts" :key="index">
                                                <td>{{item.name}}</td>
                                                <td>{{item.price}} UAH</td>
                                                <td><button @click="decrementValue(item)" class="btn btn-sm btn-danger">-</button>{{item.quantity}}<button @click="incrementProductQuantity(item.productId)" class="btn btn-sm btn-success">+</button></td>
                                                <td><button class="btn btn-sm btn-danger" @click="removeOrder(item.productId)"><i class="fas fa-trash-alt"></i></button></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td class="text-right">
                                                    Итого: {{total}} UAH
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-4">
                                        <form>
                                            <div class="form-group">
                                                <label>Доступные продукты</label>
                                                <select title="" v-model="selectedProduct" class="form-control" @change="addProduct">
                                                    <option v-for="(product) in availableProducts" :key="product.id" :value="{productId: product.id, name: product.name, price: product.price, quantity: 1}">{{product.name}} - {{product.price}} UAH</option>
                                                    <option v-if="!availableProducts.length" disabled>Все продукты выбраны</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="col-md-12 mb-4">
                                        <form>
                                            <div class="form-group">
                                                <label for="orderComment">Комментарий к заказу</label>
                                                <textarea class="form-control no-resize" id="orderComment" rows="3" v-model="formData.comment"></textarea>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                                <button @click.prevent="onClickAddOrder" :disabled="!orderProducts.length" class="btn btn-success">Добавить</button>
                                <button id="modal-close" type="button" class="btn btn-danger" data-dismiss="modal">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations, mapState} from 'vuex'
    import Vue from 'vue';
    import Loader from "../components/Loader";
    export default {
        props: [],
        name: "Orders",
        data() {
            return {
                selectedProduct: null,
                formData: {
                    userId: 1,
                    status: 1,
                    comment : ''
                },
                orderId: '',
                statusData: {
                    status: '',
                    orderId: ''
                },
            }
        },
        components: {Loader},
        computed: {
            ...mapGetters('users', ['users']),
            ...mapGetters('products', ['products']),
            ...mapGetters('orders', ['orders']),
            ...mapState('orders', ['loader']),
            orderProducts() {
                return this.$store.state.orders.orderProducts;
            },
            summ() {
                return this.orderProducts.reduce((acc, item) => {
                    return acc += item.price * item.quantity;
                }, 0)
            },
            deliverySumm() {
                if (!+this.formData.delivery || this.summ === 0) {
                    return 0
                }
                return this.summ >= 300 ? 0 : 150;
            },
            total() {
                return this.summ + this.deliverySumm;
            },
            availableProducts() {
                if (!this.orderProducts.length) {
                    return this.products;
                }
                return this.products.filter(product => !this.orderProducts.find(order => order.productId === product.id));
            }
        },
        methods: {
            ...mapActions('users', ['getAllUsers']),
            ...mapActions('products', ['getAllProducts']),
            ...mapActions('orders', ['addNewOrder', 'addNewOrderProducts', 'getAllOrders', 'deleteOrder', 'updateOrderStatus']),
            ...mapMutations('orders', ['removeOrder', 'incrementProductQuantity', 'decrementProductQuantity', 'clearOrder']),
            addProduct()
            {
                this.$store.commit('orders/addProduct', this.selectedProduct);
                this.selectedProduct = null;
            },
            decrementValue(product)
            {
                if (product.quantity === 1) {
                    this.removeOrder(product.productId);
                    return;
                }
                this.decrementProductQuantity(product.productId)
            },
            onClickAddOrder()
            {
                const data = {
                    ...this.formData,
                    total: this.total,
                }
                this.addNewOrder(data)
                    .then((resp) => {
                        this.formData.comment = ''
                        this.orderId = resp.data.last
                        this.addNewOrderProducts(this.orderProducts).then((resp) => {
                                this.clearOrder();
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
                                $('#orderModal').modal('hide')
                                this.getAllOrders();
                            }

                        )
                    }
                )
            },
            onClickDeleteOrder(id)
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
                        this.deleteOrder(id)
                        this.$swal('Успех!', 'Пользователь успешно удален.', 'success')
                    }
                    this.getAllOrders();
                })
            },
            onClickChangeStatus(id, event)
            {
                this.statusData.orderId = id;
                this.statusData.status = event.target.value;
                this.updateOrderStatus(this.statusData)
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
                        this.getAllUsers();
                        this.getAllProducts();
                        this.getAllOrders();
                    })
            }


        },
        mounted() {
            this.getAllUsers();
            this.getAllProducts();
            this.getAllOrders();
        }
    }
</script>

<style scoped>

</style>
