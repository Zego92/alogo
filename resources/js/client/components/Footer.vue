<template>
    <div>
        <Loader v-if="loader"/>
        <footer class="page-footer font-small red darken-3 pt-4 animated slideInUp">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-8 mb-2">
                        <h5 class="white-text">Подпишитесь на наши уведомления чтобы быть в курсе всех поступлений и акций</h5>
                    </div>
                    <div class="col-md-6 mb-4">
                        <form class="input-group">
                            <input type="email" v-model="formData.email" class="form-control form-control-sm" placeholder="Введите ваш Email"
                                   aria-label="Your email" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button @click="onClickAddNewSubscriber" class="btn btn-sm btn-outline-white my-0" type="button">Подписаться</button>
                            </div>
                        </form>
                        <span class="white-text d-block" v-for="error in addNewSubscriberErrorsEmail">{{error}}</span>
                    </div>
                </div>
            </div>
            <div class="footer-copyright text-center py-3">© 2019-{{getYear}} Все права защищены:
                <a target="_blank" href="https://alogo.com.ua/"> Alogo.com.ua</a>
            </div>
        </footer>
    </div>
</template>

<script>
    import Loader from "../components/Loader";
    import {mapState, mapActions, mapGetters} from 'vuex'
    import Vue from 'vue'
    export default {
        props: [],
        name: "Footer",
        data() {
            return {
                formData: {
                    email: ''
                }
            }
        },
        components: {Loader},
        computed: {
            getYear()
            {
                const date = new Date();
                const year = date.getFullYear()
                return year
            },
            ...mapState('subscribers', ['loader']),
            ...mapGetters('subscribers', ['addNewSubscriberErrorsEmail'])
        },
        methods: {
            ...mapActions('subscribers', ['addNewSubscriber']),
            onClickAddNewSubscriber()
            {
                this.addNewSubscriber(this.formData)
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
                    this.$store.commit('subscribers/logAddNewSubscriberErrors', '')
                    this.clearFormData()
                })

            },
            clearFormData()
            {
                this.formData = {
                    email: ''
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
