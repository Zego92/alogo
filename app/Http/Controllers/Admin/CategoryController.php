<?php

namespace App\Http\Controllers\Admin;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class CategoryController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $categories = Category::with('cars')->get();
        $categoryCount = Category::all()->count();
        $result['categories'] = $categories;
        $result['categoryCount'] = $categoryCount;
        return response()->json($result, 200);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $result['success'] = false;
        $slug = Str::slug($request->name);
        $validation = Validator::make($request->all(), [
            'parentId' => ['required'],
            'carId' => ['required'],
            'name' => ['required', 'unique:categories'],
            'keywords' => ['required'],
            'image' => ['required']
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $image = $request->image;
        $explode_1 = explode(';', $image);
        $explode_2 = explode('/', $explode_1[0]);
        $imageName = Str::random(12) . '.' . $explode_2[1];
        Image::make($image)->save(base_path('public/uploads/image/category/' . $imageName), 50);
        $category = new Category();
        $category->parent_id = $request->parentId;
        $category->car_id = $request->carId;
        $category->name = $request->name;
        $category->keywords = $request->keywords;
        $category->slug = $slug . date('Y-m-d');
        $category->image = $imageName;
        $category->save();
        if ($category)
        {
            $result['success'] = true;
            $result['message'] = 'Новая категория успешно добавлена';
            return response()->json($result, 201);
        }
    }

    public function show($id)
    {
        $result['success'] = true;
        $carCategories = Category::all()->where('car_id', $id);
        $result['carCategories'] = $carCategories;
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
        $result['success'] = false;
        $category = Category::find($id);
        $subCategory = Category::all()->where('parent_id', $category->id)->first();
        if (isset($subCategory))
        {
            $result['success'] = false;
            $result['error'] = 'Удаление невозможно! Категория содержит подкатегории';
            return response()->json($result, 422);
        }
        else
        {
            File::delete(public_path() . '/uploads/image/category/' . $category->image);
            $category->delete();
            return response()->json('Success', 200);
        }

    }

    public function getCategoryByCar(Request $request)
    {
//        return $request->carId;
        $result['success'] = true;
        $carCategory = Category::where('car_id', $request->carId)->get();
        $result['carCategory'] = $carCategory;
        return response()->json($result, 200);
    }
}
