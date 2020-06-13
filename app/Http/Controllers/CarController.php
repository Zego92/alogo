<?php

namespace App\Http\Controllers;

use App\Cars;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $cars = Cars::all()->toArray();
        $result['cars'] = $cars;
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
        $result['success'] = true;
        $car = Cars::with('category')->find($id)->get();
        $result['car'] = $car;
        return response()->json($result, 200);
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
