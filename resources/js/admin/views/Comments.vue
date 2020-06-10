<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Комментарии к продуктам</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="timeline" v-for="comment in comments" :key="comment.id">
                                <div class="time-label">
                                    <span class="bg-red">{{comment.created_at | moment("DD MMMM YYYY")}} Года</span>
                                </div>
                                <div>
                                    <i class="fas fa-thumbs-up bg-success"></i>
                                    <div class="timeline-item">
                                        <span class="time"><i class="fas fa-clock"></i> {{comment.created_at  | moment("h:mm") }}</span>
                                        <h3 class="timeline-header"><span >{{comment.user.name}} {{comment.user.surname}}</span> оставил комментарий к продукту {{comment.product.name}}</h3>
                                        <div class="timeline-body">
                                            {{comment.description}}
                                        </div>
                                        <div class="timeline-footer">
                                            <a class="btn btn-danger btn-sm">Удлить</a>
                                        </div>
                                    </div>
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
    import Vue from 'vue'
    const moment = require('moment')
    require('moment/locale/ru')
    Vue.use(require('vue-moment'), {
        moment
    })
    export default {
        props: [],
        name: "Comments",
        data() {
            return {}
        },
        components: {Loader},
        computed: {
            ...mapGetters('comments', ['comments']),
            ...mapState('comments', ['loader'])
        },
        methods: {
            ...mapActions('comments', ['getAllComments', 'deleteComment'])
        },
        mounted() {
            this.getAllComments()
        }
    }
</script>

<style scoped>

</style>
