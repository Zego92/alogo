<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $users = User::all();
        $userCount = User::all()->count();
        $result['users'] = $users;
        $result['userCount'] = $userCount;
        return response()->json($result, 200);
    }

    public function store(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'min:3'],
            'surname' => ['required', 'min:3'],
            'address' => ['required', 'min:3'],
            'phone' => ['required', 'unique:users'],
            'email' => ['required', 'unique:users'],
            'password' => ['required'],
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
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->password = Hash::make($request->password);
        $user->save();
        if ($user)
        {
            $result['success'] = true;
            $result['message'] = 'Новый пользователь успешно добавлен';
            return response()->json($result, 201);
        }
    }

    public function show($id)
    {
        $result['success'] = true;
        $user = User::all()->find($id);
        $result['user'] = $user;
        return response()->json($result, 200);
    }

    public function update(Request $request, $id)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'email' => ['unique:users'],
            'phone' => ['unique:users'],
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $user = User::find($id);

        $user->name = $request->name ?? $user->name;
        $user->surname = $request->surname ?? $user->surname;
        $user->email = $request->email ?? $user->email;
        $user->phone = $request->phone ?? $user->phone;
        $user->address = $request->address ?? $user->address;
        $user->save();
        $result['success'] = true;
        $result['message'] = 'Данные успешно обновлены';
        return response()->json($result, 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json('Success', 200);
    }
}
