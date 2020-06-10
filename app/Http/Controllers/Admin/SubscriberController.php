<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $subscribers = Subscriber::all()->toArray();
        $subscriberCount = Subscriber::all()->count();
        $result['subscribers'] = $subscribers;
        $result['subscriberCount'] = $subscriberCount;
        return response()->json($result, 200);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
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
        $result['success'] = false;
        $subscribers = Subscriber::find($id);
        $subscribers->delete();
        if ($subscribers->delete())
        {
            $result['success'] = true;
            $result['message'] = 'Отписка от уведомлений успешно выполнена';
            return response()->json($result, 200);
        }
    }
}
