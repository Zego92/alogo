<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper mt-5" style="min-height: 855px;">
            <section class="content mt-5">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header">
                                    <span class="h4">Информация о товаре {{product.product_number}}</span>
                                </div>
                                <div class="card-body table-responsive">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th colspan="3">Номер товара</th>
                                            <th colspan="3">{{product.product_number}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Каталожный номер</th>
                                            <th colspan="3">{{product.article}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Статус</th>
                                            <th colspan="3" v-if="product.status === '1'"><button class="btn btn-success btn-sm text-white">В наличии</button></th>
                                            <th colspan="3" v-if="product.status === '2'"><button class="btn btn-danger btn-sm text-white">Нет в наличии</button></th>
                                            <th colspan="3" v-if="product.status === '3'"><button class="btn btn-info btn-sm text-white">Под заказ</button></th>
                                            <th colspan="3" v-if="product.status === '4'"><button class="btn btn-warning btn-sm">Ожидается поставка</button></th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Производитель</th>
                                            <th colspan="3">{{product.brand}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Название</th>
                                            <th colspan="3">{{product.name}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Автопроизводитель</th>
                                            <th colspan="3">{{product.category.cars.name}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Категория товара</th>
                                            <th colspan="3">{{product.category.name}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Цена товара</th>
                                            <th colspan="3">{{product.price}} UAH</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Описание товара</th>
                                            <th colspan="3" v-html="product.description">{{product.description}}</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Создан</th>
                                            <th colspan="3">{{product.created_at | moment("DD MMMM YYYY")}} Года</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Обновлен</th>
                                            <th colspan="3">{{product.updated_at | moment("DD MMMM YYYY")}} Года</th>
                                        </tr>
                                        <tr>
                                            <th colspan="3">Изображение</th>
                                            <th colspan="3">
                                                <img height="220px" :src="`/uploads/image/product/` + product.image" alt="">
                                            </th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header">
                                    <span class="h4">Редактирование информации</span>
                                </div>
                                <div class="card-body">
                                    <form role="form">
                                        <div class="form-group">
                                            <label for="productCategory">Категория</label>
                                            <select v-model="formData.categoryId" id="productCategory" class="form-control">
                                                <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="productArticle">Каталожный номер</label>
                                            <input v-model="formData.article" type="text" class="form-control" id="productArticle" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="productBrand">Производитель</label>
                                            <input v-model="formData.brand" type="text" class="form-control" id="productBrand" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="productName">Название</label>
                                            <input v-model="formData.name" type="text" class="form-control" id="productName" required>
                                            <span v-for="error in updateProductErrorsName" class="text-danger">{{error}}</span>
                                        </div>
                                        <div class="form-group">
                                            <label for="productKeywords">Ключевые слова</label>
                                            <input v-model="formData.keywords" type="text" class="form-control" id="productKeywords" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="productPrice">Цена</label>
                                            <input v-model="formData.price" type="number" class="form-control" id="productPrice" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="productStatus">Статус</label>
                                            <select v-model="formData.status" class="custom-select" id="productStatus" >
                                                <option value="1">В наличии</option>
                                                <option value="2">Нет в наличии</option>
                                                <option value="3">Под заказ</option>
                                                <option value="4">Ожидается поставка</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Описание</label>
                                            <ckeditor v-model="formData.description" :editor="editor" :config="editorConfig" tag-name="textarea" id="productDescription"></ckeditor>
                                        </div>
                                        <div class="form-group">
                                            <label for="productImage">Изображение</label>
                                            <img :src="formData.image" alt="" height="120px" class="image-fluid my-5" id="imageid2">
                                            <div class="input-group">
                                                <div class="custom-file">
                                                    <input type="file" @change="fileChangeEvent" multiple accept="image/*" class="custom-file-input" id="productImage">
                                                    <label class="custom-file-label" for="productImage">Выберите файл</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <button @click.prevent="onClickUpdateProduct" class="btn btn-success">Обновить</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header">
                                    <span class="h5">Дополнительные изображения</span>
                                </div>
                                <div class="card-body">
                                    <form role="form" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label for="productGallery">Изображение</label>
                                            <img :src="galleryData.image" alt="" height="120px" class="image-fluid" id="imageid">
                                            <div class="input-group">
                                                <div class="custom-file">
                                                    <input type="file" @change="fileChangeEventImage" multiple accept="image/*" class="custom-file-input" id="productGallery" >
                                                    <label class="custom-file-label" for="productGallery">Выберите файл</label>
                                                </div>
                                            </div>
                                            <span v-for="error in addImageErrorsImage" class="text-danger">{{error}}</span>
                                        </div>
                                        <div v-if="product.images.length > 3" class="form-group">
                                            <button @click.prevent="onClickAddNewProductImage" class="btn btn-success btn-block" disabled>Добавить</button>
                                            <span class="text-danger d-block text-center mt-2">Достигнуто максимальное кол-во изображений товара</span>
                                        </div>
                                        <div v-else class="form-group">
                                            <button @click.prevent="onClickAddNewProductImage" class="btn btn-success btn-block">Добавить</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header">
                                    <span class="h5">Галлерея изображений Продукта</span>
                                </div>
                                <div class="card-footer d-flex" v-if="!product.images.length">
                                    <h4 class="d-block text-center my-4">Дополнительные изображения товара отсутствуют</h4>
                                </div>
                                <div class="card-footer d-flex" v-else>
                                    <div class="mx-4" v-for="image in product.images" :key="image.id" >
                                        <img class="d-block my-3" height="80px" :src="`/uploads/image/productGallery/` + image.image" alt="">
                                        <button @click.prevent="onClickDeleteGallery(image.id)" class="btn btn-sm btn-danger btn-block">Удалить</button>
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
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import '@ckeditor/ckeditor5-build-classic/build/translations/ru'; const moment = require('moment')
    require('moment/locale/ru')
    import Vue from "vue";
    Vue.use(require('vue-moment'), {
        moment
    })
    Vue.use(CKEditor);
    import Loader from "../../../components/Loader";
    export default {
        props: ['id'],
        name: "EditComponent",
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    language: 'ru'
                },
                galleryData: {
                    productId: this.$props.id,
                    image: ''
                },
                formData: {
                    categoryId: '',
                    name: '',
                    brand: '',
                    status: '',
                    image: '',
                    description: '',
                    price: '',
                    article: '',
                    keywords: ''
                }
            }
        },
        components: {Loader},
        computed: {
            ...mapGetters('products', ['product', 'updateProductErrorsName']),
            ...mapGetters('productGallery', ['addImageErrorsImage']),
            ...mapGetters('categories', ['categories']),
            ...mapState('productGallery', ['loader'])
        },
        methods: {
            ...mapActions('products', ['editProduct', 'updateProduct']),
            ...mapActions('productGallery', ['addNewProductImage', 'deleteProductImage']),
            ...mapActions('categories', ['getAllCategories']),
            fileChangeEventImage(e)
            {
                let image = e.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.galleryData.image = reader.result;
                }
                reader.readAsDataURL(image)
            },
            onClickAddNewProductImage()
            {
                this.addNewProductImage(this.galleryData)
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
                    this.editProduct(this.$props.id)
                    this.clearGalleryData()
                })
            },
            clearGalleryData()
            {
                this.galleryData = {
                    image: ''
                }
            },
            onClickDeleteGallery(id)
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
                        this.deleteProductImage(id)
                        this.$swal('Успех!', 'Дополнительное изображение успешно удалено.', 'success')
                    }
                    this.editProduct(this.$props.id)
                })
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
            onClickUpdateProduct()
            {
                this.updateProduct({
                    id: this.$props.id,
                    data: this.formData
                })
            }
        },
        mounted() {
            this.editProduct(this.$props.id)
            this.getAllCategories()
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
