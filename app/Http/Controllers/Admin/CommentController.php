<?php

namespace App\Http\Controllers\Admin;

use App\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $comments = Comment::with('users', 'product')->get();
        $commentCount = Comment::all()->count();
        $result['comments'] = $comments;
        $result['commentCount'] = $commentCount;
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
        $comment = Comment::find($id);
        $comment->delete();
        if ($comment->delete())
        {
            $result['success'] = true;
            $result['message'] = 'Комментарий успешно удален';
            return response()->json($result, 200);
        }

    }
}
