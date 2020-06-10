<?php

namespace App\Http\Controllers;

use App\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriberController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'email' => ['required', 'unique:subscribers', 'email']
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $subscriber = new Subscriber();
        $subscriber->email = $request->email;
        $subscriber->save();
        if ($subscriber)
        {
            $result['success'] = true;
            $result['message'] = 'Подписка на рассылку уведомлений оформлена! Спасибо';
            return response()->json($result, 200);
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
        //
    }
}
