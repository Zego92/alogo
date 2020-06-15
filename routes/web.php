<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');

//Admin
Route::get('/admin', 'Admin\AdminController@index')->name('admin.view');
Route::post('/admin-login', 'Admin\AdminController@login')->name('admin.login');
Route::resource('/users', 'Admin\UserController');
Route::resource('/category', 'Admin\CategoryController');
Route::resource('/cars', 'Admin\CarController');
Route::resource('/products', 'Admin\ProductController');
Route::resource('/product-gallery', 'Admin\ProductGalleryController');
Route::resource('/banners', 'Admin\BannerController');
Route::resource('/comments', 'Admin\CommentController');
Route::resource('/subscribers', 'Admin\SubscriberController');
Route::resource('/company', 'Admin\CompanyController');
Route::resource('/feedback', 'Admin\FeedbackController');
Route::resource('/orders', 'Admin\OrderController');
Route::resource('/admin-order-product', 'Admin\OrderProductController');
Route::post('/product-update-status', 'Admin\ProductController@updateProductStatus');
Route::post('/orders-update-status', 'Admin\OrderController@updateOrderStatus');
Route::post('/get-category-car', 'Admin\CategoryController@getCategoryByCar');

//Client
Route::resource('/client-banners', 'BannerController');
Route::resource('/client-subscribers', 'SubscriberController');
Route::resource('/client-cars', 'CarController');
Route::resource('/client-feedback', 'FeedbackController');
Route::resource('/client-category', 'CategoryController');
Route::resource('/client-products', 'ProductController');
Route::resource('/client-order', 'OrderController');
Route::resource('/client-order-product', 'OrderProductController');
Route::get('/get-random-cars', 'MainController@getRandomCars');
Route::get('/get-random-category', 'MainController@getRandomCategory');
Route::get('/get-random-products', 'MainController@getRandomProducts');
Route::get('/get-company-info', 'MainController@getCompanyInfo');
Route::get('/get-product/{id}', 'ProductController@getProduct');
Route::get('/get-product-random/{id}', 'ProductController@getRandomProductsForProduct');
Route::post('/client-login', 'AuthController@login');
Route::post('/client-register', 'AuthController@register');
Route::post('/client-search-vin', 'SearchController@searchByVin');
Route::post('/client-search-product', 'SearchController@searchByProduct');

