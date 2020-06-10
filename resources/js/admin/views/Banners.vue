<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Баннеры главной страницы</h1>
                        </div>
                        <div class="col-sm-6 align-items-end text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#bannerModal">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header"></div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-12 col-md-4" v-for="banner in banners" :key="banner.id">
                            <div class="card">
                                <img :src="`/uploads/image/banner/` + banner.image" class="card-img-top" alt="">
                                <div class="card-body">
                                    <button @click.prevent="onClickDeleteBanner(banner.id)" class="btn btn-block btn-danger">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="modal fade" id="bannerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Добавление нового баннера</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="bannerName">Название</label>
                                    <input v-model="formData.name" type="text" class="form-control" id="bannerName" >
                                    <span v-for="error in addBannerErrorsName" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputFile">Изображение</label>
                                    <img :src="formData.image" alt="" height="220px" class="image-fluid" id="imageid">
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" @change="fileChangeEvent" multiple accept="image/*" class="custom-file-input" id="exampleInputFile">
                                            <label class="custom-file-label" for="exampleInputFile">Выберите файл</label>
                                        </div>
                                    </div>
                                    <span v-for="error in addBannerErrorsImage" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <button @click.prevent="onClickAddNewBanner" class="btn btn-success">Добавить</button>
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
    import Loader from "../components/Loader";
    import Vue from 'vue'
    export default {
        props: [],
        name: "Banners",
        data() {
            return {
                formData: {
                    image: '',
                    name: ''
                }
            }
        },
        components: {Loader},
        computed: {
            ...mapGetters('banners', ['banners', 'addBannerErrorsName', 'addBannerErrorsImage']),
            ...mapState('banners', ['loader'])
        },
        methods: {
            ...mapActions('banners', ['getAllBanners','addNewBanner', 'deleteBanner']),
            fileChangeEvent(e)
            {
                let image = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.formData.image = reader.result;
                }
                reader.readAsDataURL(image);
            },
            onClickAddNewBanner()
            {
                this.addNewBanner(this.formData)
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
                    this.getAllBanners()
                    this.clearFormData()
                    $('#bannerModal').modal('hide')
                })
            },
            clearFormData()
            {
                this.formData = {
                    image: '',
                    name: ''
                }
            },

            onClickDeleteBanner(id)
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
                        this.deleteBanner(id)
                        this.$swal('Успех!', 'Баннер главной страницы успешно удален.', 'success')
                    }
                    this.getAllBanners();
                })
            }
        },

        mounted() {
            this.getAllBanners()
        }
    }
</script>

<style scoped>
    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }
    .custom-file-input::before {
        content: 'Select some files';
        display: inline-block;
        background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        border-radius: 3px;
        padding: 5px 8px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
    }
    .custom-file-input:hover::before {
        border-color: black;
    }
    .custom-file-input:active::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }
    .custom-file-label::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        height: calc(1.6em + 0.75rem);
        padding: 0.375rem 0.75rem;
        line-height: 1.6;
        color: #495057;
        /*content: "Файл" !important;*/
        background-color: #e9ecef;
        border-left: inherit;
        border-radius: 0 0.25rem 0.25rem 0;
        display: none !important;
    }
</style>
