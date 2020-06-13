<?php

namespace App\Http\Controllers;

use App\Cars;
use App\Product;
use Errorname\VINDecoder\Decoder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Sunrise\Vin\Vin;
use InvalidArgumentException;

class SearchController extends Controller
{
//    public function searchByVin()
//    {
//        $result['success'] = true;
//        $vin = Decoder::decode('WVGZZZ7PZCD041490');
//        $result['vin'] = $vin;
//        return response()->json($result, 200);
//        $vin = new Vin('WVGZZZ7PZCD041490');
//    }

    public function searchByVin(Request $request)
    {
        $result['success'] = false;
        try {
            $result['success'] = true;
            $vin = new Vin($request->vin);
            $result['getRegion'] = $vin->getRegion();
            $result['getCountry'] = $vin->getCountry();
            $result['getManufacturer'] = $vin->getManufacturer();
            $result['getModelYear'] = $vin->getModelYear();
            if (isset($vin) && isset($result['getManufacturer']))
            {
                $car = Cars::with('category.products')->where('name', strtoupper($result['getManufacturer']))->first();
                if (isset($car) && !empty($car))
                {
                    $result['success'] = true;
                    $result['car'] = $car;
                    return response()->json($result, 200);
                }
                if (!isset($car) && empty($car))
                {
                    $result['success'] = false;
                    $result['error'] = 'По данному автопроизводителю автозапчастей не найдено';
                    return response()->json($result, 422);
                }
            }

        } catch (InvalidArgumentException $e) {
            $result['success'] = false;
            $result['error'] = 'Некорректное значение VIN-кода';
            return response()->json($result, 422);
        }

    }

    public function searchByProduct(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'article' => ['required', 'min:3']
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $products = Product::with('category.cars')->where('article', '=', $request->article)->get();
        if ($products->isEmpty())
        {
            $result['success'] = false;
            $result['message'] = 'По вашему запросу ничего не найдено';
            return response()->json($result, 422);
        }
        if ($products->isNotEmpty())
        {
            $result['success'] = true;
            $result['products'] = $products;
            return response()->json($result, 200);
        }

    }
}
