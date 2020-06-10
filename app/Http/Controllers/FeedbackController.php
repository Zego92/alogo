<?php

namespace App\Http\Controllers;

use App\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
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
            'name' => ['required'],
            'phone' => ['required'],
            'email' => ['required'],
            'title' => ['required'],
            'description' => ['required'],
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $feedback = new Feedback();
        $feedback->name = $request->name;
        $feedback->phone = $request->phone;
        $feedback->email = $request->email;
        $feedback->title = $request->title;
        $feedback->description = $request->description;
        $feedback->save();
        if ($feedback)
        {
            $result['success'] = true;
            $result['message'] = 'Ваша заявка получена! Мы обработаем ее в ближайшее время';
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
        //
    }
}
