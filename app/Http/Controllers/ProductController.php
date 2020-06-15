<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {

    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        $result['success'] = true;
        $products = Category::with('products', 'cars')->find($id);
        $result['products'] = $products;
        return response()->json($result, 200);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

    public function getProduct($id)
    {
        $result['success'] = true;
        $product = Product::with('category.cars')->find($id);
        $result['product'] = $product;
        return response()->json($result, 200);
    }

    public function getRandomProductsForProduct($id)
    {
        $result['success'] = true;
        $randomProduct = Product::with('category.cars')->where('category_id', $id)->get()->random('3');
        $result['randomProduct'] = $randomProduct;
        return response()->json($result, 200);
    }
}
