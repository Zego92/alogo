<?php

namespace App\Http\Controllers\Admin;

use App\Banner;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class BannerController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $banners = Banner::all()->toArray();
        $bannerCount = Banner::all()->count();
        $result['banners'] = $banners;
        $result['bannerCount'] = $bannerCount;
        return response()->json($result, 200);
    }

    public function store(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'image' => ['required'],
            'name' => ['required'],
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
        Image::make($image)->save(base_path('public/uploads/image/banner/' . $imageName), 50);
        $banner = new Banner();
        $banner->name = $request->name;
        $banner->slug = $slug;
        $banner->image = $imageName;
        $banner->save();
        if ($banner)
        {
            $result['success'] = true;
            $result['message'] = 'Банер главной страницы успешно добавлен';
            return response()->json($result, 201);
        }
    }

    public function destroy($id)
    {
        $result['success'] = false;
        $banner = Banner::find($id);
        File::delete(public_path() . '/uploads/image/banner/' . $banner->image);
        $banner->delete();
        if ($banner->delete())
        {
            $result['success'] = true;
            $result['message'] = 'Банер главной страницы успешно удален';
            return response()->json($result, 200);
        }
    }
}
