<?php

namespace App\Http\Controllers;

use App\Cars;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function getRandomCars()
    {
        $result['success'] = true;
        $carCount = Cars::all()->count();
        if ($carCount < 8)
        {
            $cars = Cars::all()->random($carCount)->toArray();
        }
        else
        {
            $cars = Cars::all()->random('8')->toArray();
        }
        $result['cars'] = $cars;
        return response()->json($result, 200);
    }
}
