<?php

namespace App\Http\Controllers\Admin;

use App\Cars;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class CarController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $cars = Cars::all()->toArray();
        $carCount = Cars::all()->count();
        $result['cars'] = $cars;
        $result['carCount'] = $carCount;
        return response()->json($result, 200);
    }

    public function store(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(),[
            'name' => ['required', 'unique:cars'],
            'keywords' => ['required', 'max:255'],
            'image' => ['required'],
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
        Image::make($image)->save(base_path('public/uploads/image/car/' . $imageName), 50);
        $slug = Str::slug($request->name . date('Y-m-d'));
        $car = new Cars();
        $car->name = strtoupper($request->name);
        $car->keywords = $request->keywords;
        $car->slug = $slug;
        $car->image = $imageName;
        $car->save();
        if ($car)
        {
            $result['success'] = true;
            $result['message'] = 'Новый автопроизводитель успешно добавлен';
            return response()->json($result, 201);
        }
    }

    public function show($id)
    {
        //
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
        $car = Cars::find($id);
        $car->delete();
        return response()->json('Success', 200);
    }
}
