<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\ProductGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ProductGalleryController extends Controller
{

    public function store(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
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
        Image::make($image)->save(base_path('public/uploads/image/productGallery/' . $imageName), 50);
        $gallery = new ProductGallery();
        $gallery->product_id = $request->productId;
        $gallery->image = $imageName;
        $gallery->save();
        if ($gallery)
        {
            $result['success'] = true;
            $result['message'] = 'Дополнительное изображение успешно добавлено';
            return response()->json($result, 201);
        }
    }

    public function destroy($id)
    {
        $result['success'] = true;
        $image = ProductGallery::find($id);
        $image->delete();
        $result['message'] = 'Дополнительное изображение успешно удалено';
        return response()->json($result, 200);
    }
}
