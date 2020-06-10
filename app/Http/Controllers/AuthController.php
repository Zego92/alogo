<?php

namespace App\Http\Controllers;

use App\Subscriber;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'phone' => ['required'],
            'password' => ['required']
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $user = User::where('phone', $request->phone)->first();
        if (!isset($user))
        {
            $result['success'] = false;
            $result['err'] = 'Пользователь с такими данными не найден';
            return response()->json($result, 422);
        }
        if (isset($user))
        {
            $result['success'] = true;
            $result['user'] = $user;
            $result['message'] = 'Авторизация успешно выполнена';
            return response()->json($result, 200);
        }
    }

    public function register(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'min:3'],
            'surname' => ['required', 'min:3'],
            'email' => ['required', 'unique:users', 'email'],
            'phone' => ['required', 'unique:users'],
            'address' => ['required'],
            'password' => ['required', 'min:6'],
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $user = new User();
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->save();
        $subscriber = new Subscriber();
        $subscriber->email = $request->email;
        $subscriber->save();
        if ($user)
        {
            $result['success'] = true;
            $result['user'] = $user;
            $result['message'] = 'Регистрация нового пользователя успешно выполнена';
            return response()->json($result, 201);
        }
    }
}
