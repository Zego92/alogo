<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Telegram\Bot\Laravel\Facades\Telegram;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function index()
    {
        $result['success'] = true;
        $orders = Order::with('user')->get();
        $orderCount = Order::all()->count();
        $result['orders'] = $orders;
        $result['orderCount'] = $orderCount;
        return response()->json($result, 200);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'userId' => ['required'],
            'total' => ['required'],
            'status' => ['required'],
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = $validation->errors();
            return response()->json($result, 422);
        }
        $orderNumber = rand(pow(10, 7 - 1), pow(10, 7) - 1);
        $order = new Order();
        $order->user_id = $request->userId;
        $order->comment = $request->comment;
        $order->status = $request->status;
        $order->total = $request->total;
        $order->order_number = $orderNumber;
        $order->save();
        if ($order)
        {
            $user = User::where('id', $request->userId)->first();
            $saveOrder = Order::where('id', $order->id)->first();
            $name = $user->name;
            $email = $user->email;
            $surname = $user->surname;
            $phone = $user->phone;
            $address = $user->address;
            $total = $saveOrder->total;
            $orderNumber = $saveOrder->order_number;
            $comment = $saveOrder->comment;
            $text = "Добавлен новый заказ:\n"
                . "<strong> Имя: </strong> $name\n"
                . "<strong> Фамилия: </strong> $surname\n"
                . "<strong> Телефон: </strong> $phone\n"
                . "<strong> Email: </strong> $email\n"
                . "<strong> Адрес: </strong> $address\n"
                . "<strong> Сумма заказа: </strong> $total UAH\n"
                . "<strong> Номер заказа: </strong> $orderNumber\n"
                . "<strong> Комментарий к заказу: </strong> $comment\n";
            Telegram::sendMessage([
                'chat_id' => env('TELEGRAM_CHANNEL_ID', '76305664'),
                'parse_mode' => 'HTML',
                'text' => $text
            ]);
            $to_name = $name;
            $to_surname = $surname;
            $to_email = $email;
            $subject = 'ALOGO | Оформление заказа';
            $startBody = "Ваш заказ № $orderNumber успешно принят! Ожидайте звонка нашего оператора в ближайшее время! Спасибо что выбрали ALOGO";
            $data = array('name'=> $to_name, 'surname'=> $to_surname, 'startBody' => $startBody, 'subject' => $subject);
            Mail::send('emails.change-password-mail', $data, function($message) use ($to_name, $to_surname, $to_email, $subject) {
                $message->to($to_email, $to_name, $to_surname)->subject($subject);
                $message->from('alogo@support.com', 'ALOGO | Харьков');
            });
            $result['success'] = true;
            $result['message'] = 'Новый заказ успешно добавлен';
            return response()->json($result,  200);
        }
    }

    public function show($id)
    {
        $result['success'] = true;
        $order = Order::with('user', 'orderProducts')->find($id);
        $result['order'] = $order;
        return response()->json($result, 200);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $result['success'] = false;
        $validation = Validator::make($request->all(), [
            'status' => ['required']
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = 'Заполните обязательные поля';
            return response()->json($result, 422);
        }
        $order = Order::find($id);
        $order->user_id = $request->user_id ?? $order->user_id;
        $order->order_number = $request->orderNumber ?? $order->order_number;
        $order->total = $request->total ?? $order->total;
        $order->status = $request->status ?? $order->status;
        $order->comment = $request->comment ?? $order->comment;
        $order->save();
        if ($order)
        {
            $result['success'] = true;
            $result['message'] = 'Статус заказа успешно изменен';
            return response()->json($result, 200);
        }
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        $order->delete();
        return response()->json('Success', 200);
    }

    public function updateOrderStatus(Request $request)
    {
        $result['success'] = false;
        if (isset($request->status))
        {
            $order = Order::find($request->orderId);
            $order->update(array('status' => $request->status));
            if ($order)
            {
                $result['success'] = true;
                $result['message'] = 'Статус заказа успешно изменен';
                return response()->json($result, 200);
            }
        }
    }
}
