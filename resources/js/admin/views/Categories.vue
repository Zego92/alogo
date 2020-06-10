<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Категории</h1>
                        </div>
                        <div class="col-sm-6 align-items-end text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#categoryModal">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row align-center justify-content-center align-items-center">
                        <div class="col-8">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header"></div>
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-head-fixed">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Изображение</th>
                                            <th>Автопроизводитель</th>
                                            <th>Имя</th>
                                            <th>Тип</th>
                                            <th>Действие</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(category, $index) in categories" :key="category.id">
                                            <td>{{$index + 1}}</td>
                                            <td><img height="60px" :src="`/uploads/image/category/` + category.image" alt=""></td>
                                            <td>{{category.cars.name}}</td>
                                            <td>{{category.name}}</td>
                                            <td v-if="category.parent_id">{{ getParent(category.parent_id) }}</td>
                                            <td v-else>Самостоятельная категория</td>
                                            <td>
                                                <button @click.prevent="onClickDeleteCategory(category.id)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
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
            <div class="modal fade" id="categoryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Добавление новой категории</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label for="carBrand">Автопроизводитель</label>
                                    <select v-model="formData.carId" id="carBrand" class="custom-select">
                                        <option v-for="car in cars" :value="car.id">{{car.name}}</option>
                                    </select>
                                    <span v-for="error in addCategoryErrorsCar" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="categoryType">Тип категории</label>
                                    <select v-model="formData.parentId" id="categoryType" class="custom-select">
                                        <option value="0">Самостоятельная категория</option>
                                        <option v-for="category in categories" :value="category.id">{{category.name}}</option>
                                    </select>
                                    <span v-for="error in addCategoryErrorsParent" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="categoryName">Имя категории</label>
                                    <input v-model="formData.name" type="text" class="form-control" id="categoryName" required>
                                    <span v-for="error in addCategoryErrorsName" class="text-danger">{{error}}</span>
                                </div>

                                <div class="form-group">
                                    <label for="categoryKeywords">Ключевые слова</label>
                                    <input v-model="formData.keywords" type="text" class="form-control" id="categoryKeywords" required>
                                    <span v-for="error in addCategoryErrorsKeywords" class="text-danger">{{error}}</span>
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
                                    <span v-for="error in addCategoryErrorsImage" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <button @click.prevent="onClickAddCategory" class="btn btn-success">Добавить</button>
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
    import Vue from "vue";
    import Loader from "../components/Loader";
    export default {
        name: "Categories",
        data() {
            return {
                formData: {
                    name: '',
                    keywords: '',
                    parentId: '',
                    carId: '',
                    image: ''
                }
            }
        },
        components: {Loader},
        computed: {
            ...mapState('categories', ['loader']),
            ...mapGetters('categories',
                [
                    'categories',
                    'addCategoryErrorsParent',
                    'addCategoryErrorsName',
                    'addCategoryErrorsKeywords',
                    'addCategoryErrorsCar',
                    'addCategoryErrorsImage'
                ]),
            ...mapGetters('cars', ['cars'])
        },
        methods: {
            ...mapActions('categories',
                [
                    'getAllCategories',
                    'addNewCategory',
                    'deleteCategory'
                ]),
            ...mapActions('cars', ['getAllCars']),
            onClickAddCategory()
            {
                this.addNewCategory(this.formData)
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
                    this.getAllCategories()
                    this.clearFormData()
                    $('#categoryModal').modal('hide')
                    this.$store.commit('categories/logAddCategoryErrors', '')
                })
            },
            getParent(childrenParentId) {
                // Check if exist parent or was deleted
                return this.categories.find(cat => childrenParentId === cat.id) ? this.categories.find(cat => childrenParentId === cat.id).name : "Parent was deleted and not exist";
            },
            onClickDeleteCategory(id)
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
                        this.deleteCategory(id)
                        this.$swal('Успех!', 'Пользователь успешно удален.', 'success')
                    }
                    this.getAllCategories();
                })
            },
            clearFormData()
            {
                this.formData = {
                    name: '',
                    keywords: '',
                    parentId: ''
                }
            },
            fileChangeEvent(e)
            {
                let image = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.formData.image = reader.result;
                }
                reader.readAsDataURL(image);
            },
        },
        mounted() {
            this.getAllCategories();
            this.getAllCars();
        }
    }
</script>

<style scoped>

</style>
