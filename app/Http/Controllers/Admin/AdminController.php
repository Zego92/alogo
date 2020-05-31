<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin');
    }

    public function login(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'phone' => ['required'],
            'password' => ['required', 'min:6']
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $user = User::all()->where('phone', $request->phone)->first();
        if (!isset($user))
        {
            $result['success'] = false;
            $result['err'] = 'Пользователь с такими данными не существует';
            return response()->json($result, 422);
        }
        if (isset($user))
        {
            if ($user->role === 'admin')
            {
                $result['success'] = true;
                $result['message'] = 'Добро пожаловать в Админ панель';
                return response()->json($result, 200);
            }
        }
    }
}
