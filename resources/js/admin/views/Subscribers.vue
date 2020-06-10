<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Рассылка уведомлений</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="card shadow-lg card-primary">
                                <div class="card-header">
                                    <h3 class="card-title">Подписчики</h3>
                                    <!--                                    <div class="card-tools">-->
                                    <!--                                        <div class="input-group input-group-sm" style="width: 150px;">-->
                                    <!--                                            <input type="text" name="table_search" class="form-control float-right" placeholder="Search">-->

                                    <!--                                            <div class="input-group-append">-->
                                    <!--                                                <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>-->
                                    <!--                                            </div>-->
                                    <!--                                        </div>-->
                                    <!--                                    </div>-->
                                </div>
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-head-fixed">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Email</th>
                                            <th>Действие</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(subscriber, $index) in subscribers" :key="subscriber.id">
                                            <td>{{$index + 1}}</td>
                                            <td>{{subscriber.email}}</td>
                                            <td>
                                                <button @click.prevent="onClickDeleteSubscriber(subscriber.id)" class="btn btn-danger btn-sm"><i class="fas fa-user-minus"></i></button>
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
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import Loader from "../components/Loader";
    import Vue from "vue";
    export default {
        props: [],
        name: "Subscribers",
        data() {
            return {}
        },
        components: {Loader},
        computed: {
            ...mapGetters('subscribers', ['subscribers']),
            ...mapState('subscribers', ['loader'])
        },
        methods: {
            ...mapActions('subscribers', ['getAllSubscribers', 'deleteSubscriber']),
            onClickDeleteSubscriber(id)
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
                        this.deleteSubscriber(id)
                        this.$swal('Успех!', 'Рассылка уведомлений успешно отменена.', 'success')
                    }
                    this.getAllFeedback();
                })
            }
        },
        mounted() {
            this.getAllSubscribers()
        }
    }
</script>

<style scoped>

</style>
