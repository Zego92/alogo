<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Основная информация</h1>
                        </div>
                        <div class="col-sm-6 align-items-end text-right">
                            <button class="btn btn-success disabled" data-toggle="modal" data-target="#companyModal" v-if="companyCount === 1" disabled>Добавить</button>
                            <button class="btn btn-success" data-toggle="modal" data-target="#companyModal" v-else>Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="card card-primary">
                                <div class="card-header">
                                </div>
                                <div class="card-body" v-for="company in companies" :key="company.id">
                                    <p align="justify" v-html="company.description">{{company.description}}</p>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Телефон: {{company.phone1}}</li>
                                        <li class="list-group-item" v-if="company.phone2 === null" style="display: none">Телефон: {{company.phone2}}</li>
                                        <li class="list-group-item" v-else>Телефон: {{company.phone2}}</li>
                                        <li class="list-group-item" v-if="company.phone3 === null" style="display: none">Телефон: {{company.phone3}}</li>
                                        <li class="list-group-item" v-else>Телефон: {{company.phone3}}</li>
                                        <li class="list-group-item" v-if="company.phone4 === null" style="display: none">Телефон: {{company.phone4}}</li>
                                        <li class="list-group-item" v-else>Телефон: {{company.phone4}}</li>
                                        <li class="list-group-item" v-if="company.phone5 === null" style="display: none">Телефон: {{company.phone5}}</li>
                                        <li class="list-group-item" v-else>Телефон: {{company.phone5}}</li>
                                        <li class="list-group-item">EMAIL: {{company.email}}</li>
                                        <li class="list-group-item">Адрес: {{company.address}}</li>
                                        <li class="list-group-item">Ссылка на Google Maps: {{company.location}}</li>
                                        <li class="list-group-item">Часы работы: С {{company.startTimeWork}} До {{company.endTimeWork}}</li>
                                    </ul>
                                    <button @click.prevent="onClickDeleteCompany(company.id)" class="btn btn-block btn-danger">Удалить</button>
                                    <router-link :to="{name: 'CompanyEdit', params:{id: company.id}}"  class="btn btn-block btn-primary">Изменить</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="modal fade" id="companyModal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLabel">Добавление сведений о компании</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form role="form">
                                <div class="form-group">
                                    <label>Введите описание компании</label>
                                    <ckeditor :editor="editor" v-model="formData.description" :config="editorConfig" tag-name="textarea"></ckeditor>
                                    <span v-for="error in addCompanyErrorsDescription" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyPhone1">Контактный телефон</label>
                                    <input v-model="formData.phone1" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone1" required>
                                    <span v-for="error in addCompanyErrorsPhone1" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyPhone2">Контактный телефон</label>
                                    <input v-model="formData.phone2" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone2" required>
                                    <span v-for="error in addCompanyErrorsPhone2" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyPhone3">Контактный телефон</label>
                                    <input v-model="formData.phone3" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone3" required>
                                    <span v-for="error in addCompanyErrorsPhone3" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyPhone4">Контактный телефон</label>
                                    <input v-model="formData.phone4" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone4" required>
                                    <span v-for="error in addCompanyErrorsPhone4" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyPhone5">Контактный телефон</label>
                                    <input v-model="formData.phone5" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone5" required>
                                    <span v-for="error in addCompanyErrorsPhone5" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyEmail">Контактный Email</label>
                                    <input v-model="formData.email" type="email" class="form-control" id="companyEmail" required>
                                    <span v-for="error in addCompanyErrorsEmail" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyAddress">Адрес компании</label>
                                    <input v-model="formData.address" type="text" class="form-control" id="companyAddress" required>
                                    <span v-for="error in addCompanyErrorsAddress" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyLocation">Ссылка на Google Maps</label>
                                    <input v-model="formData.location" type="url" class="form-control" id="companyLocation" required>
                                    <span v-for="error in addCompanyErrorsLocation" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyStartWork">Время начала работы</label>
                                    <input v-model="formData.startTimeWork" type="time" class="form-control" id="companyStartWork" required>
                                    <span v-for="error in addCompanyErrorsStartTimeWork" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="companyEndWork">Время конца работы</label>
                                    <input v-model="formData.endTimeWork" type="time" class="form-control" id="companyEndWork" required>
                                    <span v-for="error in addCompanyErrorsEndTimeWork" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <button @click.prevent="onClickAddNewCompany" class="btn btn-success">Добавить</button>
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
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import '@ckeditor/ckeditor5-build-classic/build/translations/ru';
    import VueTheMask from 'vue-the-mask'
    import Vue from 'vue';
    import Loader from "../components/Loader";
    Vue.use(CKEditor);
    Vue.use(VueTheMask)
    export default {
        props: [],
        name: "Company",
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    language: 'ru'
                },
                formData: {
                    description: '',
                    phone1: '',
                    phone2: '',
                    phone3: '',
                    phone4: '',
                    phone5: '',
                    address: '',
                    email: '',
                    location: '',
                    startTimeWork: '',
                    endTimeWork: '',
                },
            }
        },
        components: {Loader},
        computed: {
            ...mapGetters('company', [
                'companies',
                'addCompanyErrorsDescription',
                'addCompanyErrorsPhone1',
                'addCompanyErrorsPhone2',
                'addCompanyErrorsPhone3',
                'addCompanyErrorsPhone4',
                'addCompanyErrorsPhone5',
                'addCompanyErrorsEmail',
                'addCompanyErrorsAddress',
                'addCompanyErrorsLocation',
                'addCompanyErrorsStartTimeWork',
                'addCompanyErrorsEndTimeWork',
                'companyCount'
            ]),
            ...mapState('company', ['loader'])
        },
        methods: {
            ...mapActions('company', ['getAllCompany', 'addNewCompany', 'deleteCompany']),
            onClickDeleteCompany(id)
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
                        this.deleteCompany(id)
                        this.$swal('Успех!', 'Данные о компании успешно удалены.', 'success')
                    }
                    this.getAllCompany();
                })
            },
            onClickAddNewCompany()
            {
                this.addNewCompany(this.formData)
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
                    $('#companyModal').modal('hide')
                    this.clearFormData()
                    this.getAllCompany()
                })
            },
            clearFormData()
            {
                this.formData = {
                    description: '',
                    phone1: '',
                    phone2: '',
                    phone3: '',
                    phone4: '',
                    phone5: '',
                    address: '',
                    email: '',
                    location: '',
                    startTimeWork: '',
                    endTimeWork: '',
                }
            },

        },
        mounted() {
            this.getAllCompany()
        }
    }
</script>

<style scoped>

</style>
