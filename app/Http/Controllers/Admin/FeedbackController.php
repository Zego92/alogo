<?php

namespace App\Http\Controllers\Admin;

use App\Feedback;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $feedback = Feedback::all()->toArray();
        $feedbackCount = Feedback::all()->count();
        $result['feedback'] = $feedback;
        $result['feedbackCount'] = $feedbackCount;
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
        $feedback = Feedback::find($id);
        $feedback->delete();
        return response()->json('Success', 200);
    }
}
