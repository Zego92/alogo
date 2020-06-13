<?php

namespace App\Http\Controllers;

use App\Cars;
use App\Category;
use App\Product;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function getRandomCars()
    {
        $result['success'] = true;
        $carCount = Cars::all()->count();
        if ($carCount < 18)
        {
            $cars = Cars::all()->random($carCount)->toArray();
        }
        else
        {
            $cars = Cars::all()->random('18')->toArray();
        }
        $result['cars'] = $cars;
        return response()->json($result, 200);
    }

    public function getRandomCategory()
    {
        $result['success'] = true;
        $categoryCount = Category::all()->count();
        if ($categoryCount < 16)
        {
            $categories = Category::with('cars')->get()->random($categoryCount)->toArray();
        }
        else
        {
            $categories = Category::with('cars')->get()->random('16')->toArray();
        }
        $result['categories'] = $categories;
        return response()->json($result, 200);
    }

    public function getRandomProducts()
    {
        $result['success'] = true;
        $productCount = Product::all()->count();
        if ($productCount < 12)
        {
            $products = Product::with('category.cars')->get()->random($productCount)->toArray();
        }
        else
        {
            $products = Product::with('category.cars')->get()->random('12')->toArray();
        }
        $result['products'] = $products;
        return response()->json($result, 200);
    }
}
