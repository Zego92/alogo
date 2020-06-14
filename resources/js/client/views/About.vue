<template>
    <div>
        <Loader v-if="loader"/>
        <div class="container my-5">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent">
                    <li class="breadcrumb-item ml-auto"><router-link class="text-dark" :to="{name: 'Main'}">Главная</router-link></li>
                    <li class="breadcrumb-item active"><a class="text-dark" style="cursor:default;">О Нас</a></li>
                </ol>
            </nav>
        </div>
        <div class="container">
            <div class="row" v-for="item in company" :key="company.id">
                <div class="col-lg-12 col-md-12 col-sm-12 my-5">
                    <h1 class="text-dark d-block text-left">О Компании</h1>
                    <hr>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 my-5">
                    <p align="justify" v-html="item.description">{{item.description}}</p>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 my-2">
                    <h3 class="text-dark d-block text-left">Наши контакты</h3>
                    <hr>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 my-5">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-transparent p-4"> <strong>Телефон :</strong> {{item.phone1}}</li>
                        <li class="list-group-item bg-transparent p-4" v-if="item.phone2 === null" style="display: none">Телефон : {{item.phone2}}</li>
                        <li class="list-group-item bg-transparent p-4" v-else> <strong>Телефон :</strong> {{item.phone2}}</li>
                        <li class="list-group-item bg-transparent p-4" v-if="item.phone3 === null" style="display: none">Телефон : {{item.phone3}}</li>
                        <li class="list-group-item bg-transparent p-4" v-else> <strong>Телефон :</strong> {{item.phone3}}</li>
                        <li class="list-group-item bg-transparent p-4" v-if="item.phone4 === null" style="display: none">Телефон : {{item.phone4}}</li>
                        <li class="list-group-item bg-transparent p-4" v-else> <strong>Телефон :</strong> {{item.phone4}}</li>
                        <li class="list-group-item bg-transparent p-4" v-if="item.phone5 === null" style="display: none">Телефон : {{item.phone5}}</li>
                        <li class="list-group-item bg-transparent p-4" v-else> <strong>Телефон :</strong> {{item.phone5}}</li>
                        <li class="list-group-item bg-transparent p-4"> <strong>EMAIL :</strong> {{item.email}}</li>
                        <li class="list-group-item bg-transparent p-4"> <strong>Адрес :</strong> {{item.address}} <a class="btn btn-sm red darken-3 white-text ml-4" :href="item.location" target="_blank"><i class="fas fa-map-marker-alt"></i></a></li>
                        <li class="list-group-item bg-transparent p-4"> <strong>Часы работы :</strong> С {{item.startTimeWork}} До {{item.endTimeWork}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import Loader from "../components/Loader";
    export default {
        props: [],
        name: "About",
        data() {
            return {}
        },
        components: {
            Loader
        },
        computed: {
            ...mapGetters('main', ['company']),
            ...mapState('main', ['loader'])
        },
        methods: {
            ...mapActions('main', ['getCompanyInfo'])
        },
        mounted() {
            this.getCompanyInfo()
        }
    }
</script>

<style scoped>

</style>
