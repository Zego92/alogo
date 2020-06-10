<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Order;
use App\OrderProduct;
use Illuminate\Http\Request;

class OrderProductController extends Controller
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
        $data = $request->all();
        $order = Order::latest()->first();
        foreach ($data as $item)
        {
            $orderProduct = new OrderProduct();
            $orderProduct->order_id = $order->id;
            $orderProduct->product_id = $item['productId'];
            $orderProduct->quantity = $item['quantity'];
            $orderProduct->name = $item['name'];
            $orderProduct->price = $item['price'];
            $orderProduct->save();
        }
        if ($orderProduct)
        {
            $result['success'] = true;
            $result['message'] = 'Продукты к заказу успешно добавлены';
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
