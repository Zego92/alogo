<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Товары</h1>
                        </div>
                        <div class="col-sm-6 align-items-end text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#productModal">Добавить</button>
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
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-head-fixed">
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Изображение</th>
                                            <th>№ Продукта</th>
                                            <th>Название</th>
                                            <th>Категория</th>
                                            <th>Цена</th>
                                            <th>Статус</th>
                                            <th>Действие</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(product, $index) in products" :key="product.id">
                                            <td>{{$index + 1}}</td>
                                            <td><img height="60px" :src="`/uploads/image/product/` + product.image" alt=""></td>
                                            <td>{{product.product_number}}</td>
                                            <td>{{product.name}}</td>
                                            <td>{{product.category.name}}</td>
                                            <td>{{product.price}} UAH</td>
                                            <td>
                                                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                                    <button v-if="product.status === '1'" class="btn btn-success btn-sm text-white">В наличии</button>
                                                    <button v-if="product.status === '2'" class="btn btn-danger btn-sm text-white">Нет в наличии</button>
                                                    <button v-if="product.status === '3'" class="btn btn-info btn-sm text-white">Под заказ</button>
                                                    <button v-if="product.status === '4'" class="btn btn-warning btn-sm">Ожидается поставка</button>
                                                    <div class="btn-group" role="group">
                                                        <button v-if="product.status === '1'" id="btnGroupDrop1" class="btn btn-success dropdown-toggle btn-sm text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                        <button v-if="product.status === '2'" id="btnGroupDrop1" class="btn btn-danger dropdown-toggle btn-sm text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                        <button v-if="product.status === '3'" id="btnGroupDrop1" class="btn btn-info dropdown-toggle btn-sm text-white" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                        <button v-if="product.status === '4'" id="btnGroupDrop1" class="btn btn-warning dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1" style="cursor: pointer">
                                                            <option @click.prevent="onClickChangeStatus(product.id, $event)" class="dropdown-item" value="1">В наличии</option>
                                                            <option @click.prevent="onClickChangeStatus(product.id, $event)" class="dropdown-item" value="2">Нет в наличии</option>
                                                            <option @click.prevent="onClickChangeStatus(product.id, $event)" class="dropdown-item" value="3">Под заказ</option>
                                                            <option @click.prevent="onClickChangeStatus(product.id, $event)" class="dropdown-item" value="4">Ожидается поставка</option>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button @click.prevent="onClickDeleteProduct(product.id)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                                <router-link :to="{name: 'ProductEdit', params:{id: product.id}}" class="btn btn-info btn-sm"><i class="fas fa-edit text-white"></i></router-link>
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
            <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Добавление нового товара</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label for="productCarCategory">Автопроизводитель</label>
                                    <select @change="onChangeGetCategory" v-model="carData.carId" class="custom-select" id="productCarCategory" >
                                        <option v-for="car in cars" :key="car.id" :value="car.id" >{{car.name}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="productCategory">Категория</label>
                                    <select v-model="formData.categoryId" class="custom-select" id="productCategory" >
                                        <option  v-for="category in carCategories"  :key="category.id" :value="category.id">{{category.name}}</option>
                                    </select>
                                    <span v-for="error in addProductErrorsCats" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="productName">Название</label>
                                    <input v-model="formData.name" type="text" class="form-control" id="productName" required>
                                    <span v-for="error in addProductErrorsName" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="productBrand">Производитель</label>
                                    <input v-model="formData.brand" type="text" class="form-control" id="productBrand" required>
                                    <span v-for="error in addProductErrorsBrand" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="productArticle">Каталожный номер</label>
                                    <input v-model="formData.article" type="text" class="form-control" id="productArticle" required>
                                    <span v-for="error in addProductErrorsArticle" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="productKeywords">Ключевые слова</label>
                                    <input v-model="formData.keywords" type="text" class="form-control" id="productKeywords" required>
                                    <span v-for="error in addProductErrorsKeywords" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="productPrice">Цена</label>
                                    <input v-model="formData.price" type="number" class="form-control" id="productPrice" required>
                                    <span v-for="error in addProductErrorsPrice" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label>Описание</label>
                                    <ckeditor :editor="editor" v-model="formData.description" :config="editorConfig" tag-name="textarea" id="productDescription"></ckeditor>
                                    <span v-for="error in addProductErrorsDescription" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="productStatus">Статус</label>
                                    <select v-model="formData.status" class="custom-select" id="productStatus" >
                                        <option value="1">В наличии</option>
                                        <option value="2">Нет в наличии</option>
                                        <option value="3">Под заказ</option>
                                        <option value="4">Ожидается поставка</option>
                                    </select>
                                    <span v-for="error in addProductErrorsStatus" class="text-danger">{{error}}</span>
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
                                    <span v-for="error in addProductErrorsImage" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <button @click.prevent="onClickAddNewProduct" class="btn btn-success">Добавить</button>
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
    import Vue from 'vue';
    import Loader from "../components/Loader";
    Vue.use(CKEditor);
    export default {
        name: "Products",
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    language: 'ru'
                },
                formData: {
                    categoryId: '',
                    name: '',
                    keywords: '',
                    price: '',
                    description: '',
                    image: '',
                    brand: '',
                    number: '',
                    article: '',
                    status: ''
                },
                statusData: {
                    status: '',
                    productId: ''
                },
                carData: {
                    carId: ''
                },



            }
        },
        components: {Loader},
        computed: {
            ...mapGetters('categories', ['categories', 'carCategories']),
            ...mapGetters('cars', ['cars']),
            ...mapState('products', ['loader']),
            ...mapGetters('products',
                [
                    'products',
                    'addProductErrorsCats',
                    'addProductErrorsName',
                    'addProductErrorsBrand',
                    'addProductErrorsArticle',
                    'addProductErrorsPrice',
                    'addProductErrorsStatus',
                    'addProductErrorsDescription',
                    'addProductErrorsImage',
                    'addProductErrorsKeywords',
            ])
        },
        methods: {
            ...mapActions('categories', ['getAllCategories', 'getCarCategories']),
            ...mapActions('cars', ['getAllCars']),
            ...mapActions('products', ['getAllProducts', 'addNewProduct', 'updateProductStatus', 'deleteProduct']),

            fileChangeEvent(e)
            {
                let image = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.formData.image = reader.result;
                }
                reader.readAsDataURL(image);
            },
            clearFormData()
            {
                this.formData = {
                    categoryId: '',
                    name: '',
                    keywords: '',
                    price: '',
                    description: '',
                    image: '',
                    brand: '',
                    number: '',
                    article: '',
                    status: ''
                }
            },
            onClickAddNewProduct()
            {
                this.addNewProduct(this.formData)
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
                    this.clearFormData()
                    this.clearData()
                    $('#productModal').modal('hide')
                    this.getAllCategories();
                    this.getAllProducts();
                    this.$store.commit('products/logAddProductErrors', '')
                })
            },
            onClickChangeStatus(id, event)
            {
                this.statusData.productId = id;
                this.statusData.status = event.target.value;
                this.updateProductStatus(this.statusData)
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
                    this.getAllCategories();
                    this.getAllProducts();
                })
                // console.log(this.statusData)
            },
            onClickDeleteProduct(id)
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
                        this.deleteProduct(id)
                        this.$swal('Успех!', 'Товар успешно удален.', 'success')
                    }
                    this.getAllCategories();
                    this.getAllProducts();
                })
            },
            onChangeGetCategory()
            {
                this.getCarCategories(this.carData.carId)

            },
            clearData()
            {
                this.carData = {
                    carId: ''
                }
            }

        },
        mounted() {
            this.getAllCategories();
            this.getAllProducts();
            this.getAllCars()
        }
    }
</script>

<style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>
