<template>
    <div>
        <Loader v-if="loader"/>
        <!--Navbar -->
        <nav class="mb-1 navbar navbar-expand-lg navbar-dark red darken-3 scrolling-navbar animated slideInDown z-depth-3">
            <a class="navbar-brand" href="#">ALOGO</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
                    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent-333">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link :to="{name: 'Main'}" class="nav-link">Главная</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Cars'}">Каталог продукции</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'Search'}">Поиск</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link":to="{name: 'About'}">О нас</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto nav-flex-icons">
                    <li class="nav-item">
                        <a class="nav-link waves-effect waves-light" data-toggle="modal" data-target="#modalContactForm">
                            <i class="fas fa-question"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link waves-effect waves-light" data-toggle="modal" data-target="#modalCart">
                            <i class="fas fa-shopping-cart"></i> Всего: {{total}} UAH
                        </a>
                    </li>
                    <li class="nav-item" v-if="this.$store.state.auth.isAuth === true" style="display: none">
                        <a class="nav-link waves-effect waves-light" data-toggle="modal" data-target="#modalLRForm" >
                            <i class="fas fa-user"></i>
                        </a>
                    </li>
                    <li class="nav-item" v-else>
                        <a class="nav-link waves-effect waves-light" data-toggle="modal" data-target="#modalLRForm" >
                            <i class="fas fa-user"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <!--Modal: Login / Register Form-->
        <div class="modal fade" id="modalLRForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog cascading-modal" role="document">
                <div class="modal-content">
                    <div class="modal-c-tabs">
                        <ul class="nav nav-tabs md-tabs tabs-2 bg-danger py-3" role="tablist">
                            <li class="nav-item">
                                <a @click.prevent="clearLoginErrors" class="nav-link active text-white border-0" data-toggle="tab" href="#panel7" role="tab"><i class="fas fa-user mr-1"></i>Авторизация</a>
                            </li>
                            <li class="nav-item">
                                <a @click.prevent="clearRegisterErrors" class="nav-link text-white border-0" data-toggle="tab" href="#panel8" role="tab"><i class="fas fa-user-plus mr-1"></i>Регистрация</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade in show active" id="panel7" role="tabpanel">
                                <div class="modal-body mb-1">
                                    <form role="form" class="was-validated">
                                        <div class="md-form mb-5">
                                            <i class="fas fa-mobile-alt prefix"></i>
                                            <input v-model="loginData.phone" type="tel" id="modalLRInput10" v-mask="'+380#########'" class="form-control form-control-sm validate" required minlength="13">
                                            <label data-error="wrong" data-success="right" for="modalLRInput10">Введите телефон</label>
                                            <span v-for="error in loginErrorsPhone" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="md-form mb-4">
                                            <i class="fas fa-lock prefix"></i>
                                            <input v-model="loginData.password" type="password" id="modalLRInput11" class="form-control form-control-sm validate" required minlength="8">
                                            <label data-error="wrong" data-success="right" for="modalLRInput11">Введите пароль</label>
                                            <span v-for="error in loginErrorsPassword" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="text-center mt-2">
                                            <button @click.prevent="onClickLogin" class="btn btn-danger btn-block">Войти <i class="fas fa-sign-in ml-1"></i></button>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer d-block text-center">
                                    <button id="modal-close" class="btn btn-block btn-outline-danger waves-effect my-3" data-dismiss="modal">Закрыть</button>
                                    <p class="my-3"><a href="#" class="text-danger">Забыли Пароль?</a></p>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="panel8" role="tabpanel">
                                <div class="modal-body">
                                    <form role="form" class="was-validated">
                                        <div class="md-form form-sm mb-5">
                                            <i class="fas fa-user-alt prefix"></i>
                                            <input v-model="registerData.name" type="text" id="userName" class="form-control form-control-sm validate" required minlength="3">
                                            <label data-error="wrong" data-success="right" for="userName">Введите имя</label>
                                            <span v-for="error in registerErrorsName" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="md-form form-sm mb-5">
                                            <i class="fas fa-user-alt prefix"></i>
                                            <input v-model="registerData.surname" type="text" id="userSurname" class="form-control form-control-sm validate" required minlength="3">
                                            <label data-error="wrong" data-success="right" for="userSurname">Введите фамилию</label>
                                            <span v-for="error in registerErrorsSurname" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="md-form form-sm mb-5">
                                            <i class="fas fa-envelope prefix"></i>
                                            <input v-model="registerData.email" type="email" id="userEmail" class="form-control form-control-sm validate" required minlength="10">
                                            <label data-error="wrong" data-success="right" for="userEmail">Введите Email</label>
                                            <span v-for="error in registerErrorsEmail" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="md-form form-sm mb-5">
                                            <i class="fas fa-mobile-alt prefix"></i>
                                            <input v-model="registerData.phone" type="tel" id="userPhone" v-mask="'+380#########'" class="form-control form-control-sm validate" minlength="13" required >
                                            <label data-error="wrong" data-success="right" for="userPhone">Введите телефон</label>
                                            <span v-for="error in registerErrorsPhone" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="md-form form-sm mb-5">
                                            <i class="fas fa-map-marker-alt prefix"></i>
                                            <input v-model="registerData.address" type="text" id="userAddress" class="form-control form-control-sm validate" required>
                                            <label data-error="wrong" data-success="right" for="userAddress">Введите адрес</label>
                                            <span v-for="error in registerErrorsAddress" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="md-form form-sm mb-5">
                                            <i class="fas fa-lock prefix"></i>
                                            <input v-model="registerData.password" type="password" id="modalLRInput13" class="form-control form-control-sm validate" required minlength="8">
                                            <label data-error="wrong" data-success="right" for="modalLRInput13">Введите пароль</label>
                                            <span v-for="error in registerErrorsPassword" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="text-center form-sm my-2">
                                            <button @click.prevent="onClickRegister" class="btn btn-block btn-danger">Регистрация <i class="fas fa-sign-in ml-1"></i></button>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer my-2">
                                    <button id="modal-close" type="button" class="btn btn-outline-danger btn-block waves-effect" data-dismiss="modal">Закрыть</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modalContactForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">Задайте нам вопрос</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3">
                        <form role="form">
                            <div class="md-form mb-5">
                                <i class="fas fa-user prefix grey-text"></i>
                                <input v-model="feedbackData.name" type="text" id="feedbackName" class="form-control validate">
                                <label data-error="wrong" data-success="right" for="feedbackName">Ваше имя</label>
                                <span v-for="error in addFeedbackErrorsName" class="text-danger">{{error}}</span>
                            </div>

                            <div class="md-form mb-5">
                                <i class="fas fa-envelope prefix grey-text"></i>
                                <input v-model="feedbackData.email" type="email" id="feedbackEmail" class="form-control validate">
                                <label data-error="wrong" data-success="right" for="feedbackEmail">Контактный Email</label>
                                <span v-for="error in addFeedbackErrorsEmail" class="text-danger">{{error}}</span>
                            </div>

                            <div class="md-form mb-5">
                                <i class="fas fa-mobile-alt prefix grey-text"></i>
                                <input v-model="feedbackData.phone" type="tel" v-mask="'+380#########'" id="feedbackPhone" class="form-control validate">
                                <label data-error="wrong" data-success="right" for="feedbackPhone">Контактный телефон</label>
                                <span v-for="error in addFeedbackErrorsPhone" class="text-danger">{{error}}</span>
                            </div>

                            <div class="md-form mb-5">
                                <i class="fas fa-tag prefix grey-text"></i>
                                <input v-model="feedbackData.title" type="text" id="feedbackTitle" class="form-control validate">
                                <label data-error="wrong" data-success="right" for="feedbackTitle">Тема сообщения</label>
                                <span v-for="error in addFeedbackErrorsTitle" class="text-danger">{{error}}</span>
                            </div>

                            <div class="md-form">
                                <i class="fas fa-pencil-alt prefix grey-text"></i>
                                <textarea v-model="feedbackData.description" type="text" id="feedbackDescription" class="md-textarea form-control" rows="4"></textarea>
                                <label data-error="wrong" data-success="right" for="feedbackDescription">Описание проблемы</label>
                                <span v-for="error in addFeedbackErrorsDescription" class="text-danger">{{error}}</span>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer d-flex justify-content-center my-4">
                        <button @click.prevent="onClickAddNewFeedback" class="btn btn-block btn-danger">Отправить <i class="fas fa-paper-plane-o ml-1"></i></button>
                        <button id="modal-close" type="button" class="btn btn-outline-danger btn-block waves-effect" data-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: modalCart -->
        <div class="modal fade" id="modalCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Корзина</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-hover">
                            <thead>
                            <tr v-if="!orderProducts.length">
                                <span>Корзина Пуста</span>
                            </tr>
                            <tr v-else>
                                <th>#</th>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Колличество</th>
                                <th>Удалить</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in orderProducts" :key="index">
                                <th scope="row">1</th>
                                <td>{{item.name}}</td>
                                <td>{{item.price}} UAH</td>
                                <td><button @click="decrementValue(item)" class="btn btn-sm btn-danger p-1 px-3">-</button>{{item.quantity}}<button @click="incrementProductQuantity(item.productId)" class="btn btn-sm btn-success p-1 px-3">+</button></td>
                                <td><a @click="removeOrder(item.productId)"><i class="fas fa-times text-danger"></i></a></td>
                            </tr>
                            <tr class="total" v-if="!orderProducts.length" style="display: none">
                                <th scope="row">5</th>
                                <td>Общая цена</td>
                                <td></td>
                                <td>{{summ}} UAH</td>
                                <td></td>
                            </tr>
                            <tr class="total" v-else>
                                <th scope="row">5</th>
                                <td>Общая цена</td>
                                <td></td>
                                <td>{{summ}} UAH</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="md-form mb-4" v-if="!orderProducts.length" style="display: none">
                            <i class="fas fa-angle-double-right prefix"></i>
                            <textarea v-model="formData.comment" id="form21" class="md-textarea form-control" rows="3"></textarea>
                            <label for="form21">Комментарий к заказу</label>
                        </div>
                        <div class="md-form mb-4" v-else>
                            <i class="fas fa-angle-double-right prefix"></i>
                            <textarea v-model="formData.comment" id="form21" class="md-textarea form-control" rows="3"></textarea>
                            <label for="form21">Комментарий к заказу</label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button id="modal-close" type="button" class="btn btn-success" data-dismiss="modal">Продолжить покупки</button>
                        <button v-if="!orderProducts.length" @click.prevent="onClickAddOrder" class="btn btn-danger" disabled>Оформить заказа</button>
                        <button v-else @click.prevent="onClickAddOrder" class="btn btn-danger" >Оформить заказа</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: modalCart -->
    </div>
</template>

<script>
    import VueTheMask from 'vue-the-mask'
    import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
    import Loader from "./Loader";
    import Vue from 'vue'
    Vue.use(VueTheMask);
    export default {
        props: [],
        name: "Header",
        data() {
            return {
                loginData: {
                    phone: '',
                    password: ''
                },
                registerData: {
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    password: '',
                    address: '',
                },
                feedbackData: {
                    name: '',
                    phone: '',
                    email: '',
                    title: '',
                    description: '',
                },
                selectedProduct: null,
                formData: {
                    delivery: '',
                    comment : ''
                },
            }
        },
        components: {Loader},
        computed: {
            ...mapGetters('auth', [
                'loginErrorsPhone',
                'loginErrorsPassword',
                'registerErrorsName',
                'registerErrorsSurname',
                'registerErrorsEmail',
                'registerErrorsPhone',
                'registerErrorsAddress',
                'registerErrorsPassword',
                'user'
            ]),
            ...mapState('auth', ['loader']),
            ...mapState('orders', ['loader']),
            ...mapState('feedback', ['loader']),
            ...mapGetters('feedback', [
                'addFeedbackErrorsName',
                'addFeedbackErrorsPhone',
                'addFeedbackErrorsEmail',
                'addFeedbackErrorsTitle',
                'addFeedbackErrorsDescription',
            ]),
            orderProducts()
            {
                return this.$store.state.orders.orderProducts;
            },
            summ()
            {
                return this.orderProducts.reduce((acc, item) => {
                    return acc += item.price * item.quantity;
                }, 0)
            },
            deliverySumm()
            {
                if (!+this.formData.delivery || this.summ === 0) {
                    return 0
                }
                return this.summ >= 300 ? 0 : 150;
            },
            total()
            {
                return this.summ + this.deliverySumm;
            },
            decrementValue(product)
            {
                if (product.quantity === 1) {
                    this.removeOrder(product.productId);
                    return;
                }
                this.decrementProductQuantity(product.productId)
            },
        },
        methods: {
            ...mapActions('auth', ['login', 'register']),
            ...mapActions('feedback', ['addNewFeedback']),
            ...mapActions('orders', ['addNewOrder', 'addNewOrderProducts']),
            ...mapMutations('orders', ['removeOrder', 'incrementProductQuantity', 'decrementProductQuantity', 'clearOrder']),
            onClickLogin()
            {
                this.login(this.loginData)
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
                    });
                    this.clearLoginData();
                    $('#modalLRForm').modal('hide');
                    this.$store.commit('auth/logLoginErrors', '')
                })
            },
            onClickRegister()
            {
                this.register(this.registerData)
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
                    });
                    $('#modalLRForm').modal('hide');
                    this.clearRegisterData();
                    this.$store.commit('auth/logRegisterErrors', '')
                })
            },
            clearLoginData()
            {
                this.loginData = {
                    phone: '',
                    password: ''
                }
            },
            clearRegisterData()
            {
                this.registerData = {
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    password: '',
                    address: '',
                }
            },
            clearLoginErrors()
            {
                this.$store.commit('auth/logLoginErrors', '')
            },
            clearRegisterErrors()
            {
                this.$store.commit('auth/logRegisterErrors', '')
            },
            clearFeedBackData()
            {
                this.feedbackData = {
                    name: '',
                    phone: '',
                    email: '',
                    title: '',
                    description: '',
                }
            },

            onClickAddNewFeedback()
            {
                this.addNewFeedback(this.feedbackData)
                .then((resp) => {
                    Vue.swal({
                        toast:true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: 'success',
                        title: resp.data.message
                    });
                    $('#modalContactForm').modal('hide')
                    this.clearFeedBackData()
                })
            },
            onClickAddOrder()
            {
                const data = {
                    ...this.formData,
                    total: this.total,
                    userId: this.user.id
                }
                this.addNewOrder(data).then((resp) => {
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
                    $('#modalCart').modal('hide')
                    this.addNewOrderProducts(this.orderProducts).then((resp) => {})
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
            },

        },
        mounted() {
        }
    }
</script>

<style scoped>
    .modal-c-tabs ul li a.active{
        background-color: #CC0000;
    }
    .router-link-exact-active{
        background-color: rgba(255,255,255,0.2);
    }
    .router-link-active{
        background-color: rgba(255,255,255,0.2);
    }
</style>
