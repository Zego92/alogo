<template>
    <div class="hold-transition login-page">
        <ul class="list-group list-group-flush bg-transparent">
            <li class="list-group-item text-danger bg-transparent" v-for="error in loginErrorsPhone">{{error}}</li>
        </ul>
        <ul class="list-group list-group-flush bg-transparent">
            <li class="list-group-item text-danger bg-transparent" v-for="error in loginErrorsPassword">{{error}}</li>
        </ul>
        <div class="login-box">
            <div class="login-logo">
                <b>Alogo |</b> Admin
            </div>
            <div class="card shadow">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Необходима Авторизация</p>
                    <form>
                        <div class="input-group my-4">
                            <input v-model="formData.phone" title="" type="tel" v-mask="'+380#########'" class="form-control" placeholder="Введите Телефон">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-mobile"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group my-4">
                            <input v-model="formData.password" title="" type="password" class="form-control" placeholder="Введите Пароль">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group my-4">
                            <button @click.prevent="onClickLogin" class="btn btn-primary btn-block">Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import VueTheMask from 'vue-the-mask'
    import Vue from 'vue'
    Vue.use(VueTheMask)
    export default {
        name: "Login",
        data() {
            return {
                formData: {
                    phone: '',
                    password: ''
                }
            }
        },
        components: {

        },
        computed: {
            ...mapGetters('auth', ['loginErrorsPhone', 'loginErrorsPassword'])
        },
        methods: {
            ...mapActions('auth', ['login']),
            onClickLogin()
            {
                this.login(this.formData)
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
                    this.$router.push({name: 'Dashboard'})
                    this.$store.commit('auth/logLoginErrors', '')
                })
                .catch((error) => {
                    Vue.swal({
                        toast:true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: 'error',
                        title: error.response.data.err
                    })
                })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
