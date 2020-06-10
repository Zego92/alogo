<template>
    <div>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-10">
                            <h1 class="m-0 text-dark">Изменение информации о компании</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-8">
                            <div class="card card-primary">
                                <div class="card-header"></div>
                                <div class="card-body">
                                    <form role="form">
                                        <div class="form-group">
                                            <label>Введите описание компании</label>
                                            <ckeditor :editor="editor" v-model="formData.description" :config="editorConfig" tag-name="textarea"></ckeditor>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyPhone1">Контактный телефон</label>
                                            <input v-model="formData.phone1" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone1" required>
                                            <span v-for="error in updateCompanyErrorsPhone1" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyPhone2">Контактный телефон</label>
                                            <input v-model="formData.phone2" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone2" required>
                                            <span v-for="error in updateCompanyErrorsPhone2" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyPhone3">Контактный телефон</label>
                                            <input v-model="formData.phone3" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone3" required>
                                            <span v-for="error in updateCompanyErrorsPhone3" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyPhone4">Контактный телефон</label>
                                            <input v-model="formData.phone4" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone4" required>
                                            <span v-for="error in updateCompanyErrorsPhone4" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyPhone5">Контактный телефон</label>
                                            <input v-model="formData.phone5" type="tel" v-mask="'+380#########'" class="form-control" id="companyPhone5" required>
                                            <span v-for="error in updateCompanyErrorsPhone5" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyEmail">Контактный Email</label>
                                            <input v-model="formData.email" type="email" class="form-control" id="companyEmail" required>
                                            <span v-for="error in updateCompanyErrorsEmail" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyAddress">Адрес компании</label>
                                            <input v-model="formData.address" type="text" class="form-control" id="companyAddress" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyLocation">Ссылка на Google Maps</label>
                                            <input v-model="formData.location" type="url" class="form-control" id="companyLocation" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyStartWork">Время начала работы</label>
                                            <input v-model="formData.startTimeWork" type="time" class="form-control" id="companyStartWork" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="companyEndWork">Время конца работы</label>
                                            <input v-model="formData.endTimeWork" type="time" class="form-control" id="companyEndWork" required>
                                        </div>
                                        <div class="form-group">
                                            <button @click.prevent="onClickEditCompany" class="btn btn-success">Изменить</button>
                                            <button id="modal-close" type="button" class="btn btn-danger" data-dismiss="modal">Закрыть</button>
                                        </div>
                                    </form>
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
    import {mapActions, mapGetters} from 'vuex'
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import '@ckeditor/ckeditor5-build-classic/build/translations/ru';
    import VueTheMask from 'vue-the-mask'
    import Vue from 'vue';
    Vue.use(CKEditor);
    Vue.use(VueTheMask)
    export default {
        props: ['id'],
        name: "EditComponent",
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
        components: {},
        computed: {
            ...mapGetters('company', [
                'updateCompanyErrorsPhone1',
                'updateCompanyErrorsPhone2',
                'updateCompanyErrorsPhone3',
                'updateCompanyErrorsPhone4',
                'updateCompanyErrorsPhone5',
                'updateCompanyErrorsEmail',
            ])
        },
        methods: {
            ...mapActions('company', ['editCompany', 'updateCompany']),
            onClickEditCompany()
            {
                this.updateCompany({
                    id: this.$props.id,
                    data: this.formData
                })
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
                    this.clearFormData()
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
            this.editCompany(this.$props.id)
        }
    }
</script>

<style scoped>

</style>
