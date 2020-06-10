<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Обратная связь</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content bg-transparent">
                <div class="container-fluid bg-transparent">
                    <div class="row align-center justify-content-center align-items-center bg-transparent">
                        <div class="col-8 bg-transparent">
                            <div class="callout callout-danger" v-for="item in feedback" :key="item.id">
                                <h5>Контактные данные: {{item.name}} | {{item.phone}} | {{item.email}}</h5>
                                <h5>Тема обращения: {{item.title}}</h5>
                                <p>{{item.description}}</p>
                                <button @click.prevent="onClickDeleteFeedback(item.id)" class="btn btn-block btn-danger">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import Vue from "vue";
    import Loader from "../components/Loader";
    export default {
        props: [],
        name: "Feedback",
        data() {
            return {}
        },
        components: {Loader},
        computed: {
            ...mapGetters('feedback', ['feedback']),
            ...mapState('feedback', ['loader'])
        },
        methods: {
            ...mapActions('feedback', ['getAllFeedback', 'deleteFeedback']),
            onClickDeleteFeedback(id)
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
                        this.deleteFeedback(id)
                        this.$swal('Успех!', 'Заявка успешно удалена.', 'success')
                    }
                    this.getAllFeedback();
                })
            }
        },
        mounted() {
            this.getAllFeedback()
        }
    }
</script>

<style scoped>

</style>
