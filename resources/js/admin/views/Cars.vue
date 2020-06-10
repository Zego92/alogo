<template>
    <div>
        <Loader v-if="loader"/>
        <div class="content-wrapper" style="min-height: 855px;">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0 text-dark">Автопроизводители</h1>
                        </div>
                        <div class="col-sm-6 align-items-end text-right">
                            <button class="btn btn-success" data-toggle="modal" data-target="#carModal">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="content">
                <div class="container-fluid">
                    <div class="row align-center justify-content-center align-items-center">
                        <div class="col-8">
                            <div class="card card-primary shadow-lg">
                                <div class="card-header">
                                    <h3 class="card-title">Добавленные автопроизводители</h3>
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
                                            <th>Изображение</th>
                                            <th>Марка</th>
                                            <th>Действие</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(car, $index) in cars" :key="car.id">
                                            <td>{{$index + 1}}</td>
                                            <td><img height="60px" :src="`/uploads/image/car/` + car.image" alt=""></td>
                                            <td>{{car.name}}</td>
                                            <td>
                                                <button @click.prevent="onClickDeleteCar(car.id)" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
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
            <div class="modal fade" id="carModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Добавление новой марки автомобиля</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form role="form">
                                <div class="form-group">
                                    <label for="categoryName">Имя автопроизводителя</label>
                                    <input v-model="formData.name" type="text" class="form-control" id="categoryName" required>
                                    <span v-for="error in addCarErrorsName" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <label for="categoryKeywords">Ключевые слова</label>
                                    <input v-model="formData.keywords" type="text" class="form-control" id="categoryKeywords" required>
                                    <span v-for="error in addCarErrorsKeywords" class="text-danger">{{error}}</span>
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
                                    <span v-for="error in addCarErrorsImage" class="text-danger">{{error}}</span>
                                </div>
                                <div class="form-group">
                                    <button @click.prevent="onClickAddNewCar" class="btn btn-success">Добавить</button>
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
        name: "Cars",
        data() {
            return {
                formData: {
                    name: '',
                    keywords: '',
                    image: '',
                }
            }
        },
        components: {Loader},
        computed: {
            ...mapGetters('cars', ['cars', 'addCarErrorsName', 'addCarErrorsKeywords', 'addCarErrorsImage']),
            ...mapState('cars', ['loader'])
        },
        methods: {
            ...mapActions('cars', ['getAllCars', 'addNewCar', 'deleteCar']),

            onClickAddNewCar()
            {
                this.addNewCar(this.formData)
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
                    this.getAllCars()
                    this.clearFormData()
                    $('#carModal').modal('hide')
                })
            },

            onClickDeleteCar(id)
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
                        this.deleteCar(id)
                        this.$swal('Успех!', 'Автопроизводитель успешно удален.', 'success')
                    }
                    this.getAllCars();
                })
            },

            clearFormData()
            {
                this.formData = {
                    name: '',
                    keywords: '',
                    image: '',
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
            this.getAllCars()
        }
    }
</script>

<style scoped>

</style>
