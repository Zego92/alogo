<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $products = Product::with('category')->get()->toArray();
        $productCount = Product::all()->count();
        $result['products'] = $products;
        $result['productCount'] = $productCount;
        return response()->json($result, 200);
    }

    public function store(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'categoryId' => ['required'],
            'name' => ['required'],
            'brand' => ['required'],
            'article' => ['required'],
            'keywords' => ['required'],
            'price' => ['required'],
            'status' => ['required'],
            'description' => ['required'],
            'image' => ['required'],
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $slug = Str::slug($request->name);
        $image = $request->image;
        $explode_1 = explode(';', $image);
        $explode_2 = explode('/', $explode_1[0]);
        $imageName = Str::random(12) . '.' . $explode_2[1];
        Image::make($image)->save(base_path('public/uploads/image/product/' . $imageName), 50);
        $productNumber = rand(pow(10, 7 - 1), pow(10, 7) - 1);
        $product = new Product();
        $product->category_id = $request->categoryId;
        $product->name = $request->name;
        $product->brand = $request->brand;
        $product->product_number = $productNumber;
        $product->article = $request->article;
        $product->keywords = $request->keywords;
        $product->price = $request->price;
        $product->status = $request->status;
        $product->slug = $slug;
        $product->description = $request->description;
        $product->image =$imageName;
        $product->save();
        if ($product)
        {
            $result['success'] = true;
            $result['message'] = 'Новый товар успешно добавлен';
            return response()->json($result, 201);
        }
    }

    public function show($id)
    {
        $result['success'] = true;
        $product = Product::with('images','category.cars')->find($id);
        $result['product'] = $product;
        return response()->json($result, 200);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'name' => ['unique:products']
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        if (isset($request->image))
        {
            $image = $request->image;
            $explode_1 = explode(';', $image);
            $explode_2 = explode('/', $explode_1[0]);
            $imageName = Str::random(12) . '.' . $explode_2[1];
            Image::make($image)->save(base_path('public/uploads/image/product/' . $imageName), 50);
        }
        $product = Product::find($id);
        $product->category_id = $request->category_id ?? $product->category_id;
        $product->name = $request->name ?? $product->name;
        $product->brand = $request->brand ?? $product->brand;
        $product->article = $request->article ?? $product->article;
        $product->price = $request->price ?? $product->price;
        $product->status = $request->status ?? $product->status;
        $product->keywords = $request->keywords ?? $product->keywords;
        $product->description = $request->description ?? $product->description;
        $product->description = $imageName ?? $product->description;
        $product->save();
        if ($product)
        {
            $result['success'] = true;
            $result['message'] = 'Данные успешно изменены';
            return response()->json($result, 200);
        }
    }

    public function destroy($id)
    {
        $result['success'] = false;
        $product = Product::find($id);
        File::delete(public_path() . '/uploads/image/product/' . $product->image);
        $product->delete();
        if ($product->delete())
        {
            $result['success'] = true;
            $result['message'] = 'Выбранный продукт успешно удален';
            return response()->json($result, 200);
        }

    }

    public function updateProductStatus(Request $request)
    {
        $result['success'] = false;
        if (isset($request->status))
        {
            $product = Product::find($request->productId);
            $product->update(array('status' => $request->status));
            if ($product)
            {
                $result['success'] = true;
                $result['message'] = 'Статус наличия продукта успешно изменен';
                return response()->json($result, 200);
            }
        }
    }
}
