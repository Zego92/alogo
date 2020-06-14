<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Telegram\Bot\Laravel\Facades\Telegram;

class OrderController extends Controller
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
            'userId' => ['required']
        ]);
        if ($validation->fails())
        {
            $result['success'] = false;
            $result['error'] = 'Для оформления заказа необходима авторизация';
            return response()->json($result, 422);
        }
        $orderNumber = rand(pow(10, 7 - 1), pow(10, 7) - 1);
        $order = new Order();
        $order->user_id = $request->userId;
        $order->comment = $request->comment;
        $order->status = 1;
        $order->total = $request->total;
        $order->order_number = $orderNumber;
        $order->save();
        if ($order) {
            $user = User::where('id', $request->userId)->first();
            $saveOrder = Order::where('id', $order->id)->first();
            $name = $user->name;
            $email = $user->email;
            $surname = $user->surname;
            $phone = $user->phone;
            $address = $user->address;
            $total = $saveOrder->total;
            $orderNumber = $saveOrder->orderNumber;
            $comment = $saveOrder->comment;

            $text = "Добавлен новый заказ:\n"
                . "<strong> Имя: </strong> $name\n"
                . "<strong> Фамилия: </strong> $surname\n"
                . "<strong> Телефон: </strong> $phone\n"
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
            $data = array('name' => $to_name, 'surname' => $to_surname, 'startBody' => $startBody, 'subject' => $subject);
            Mail::send('emails.change-password-mail', $data, function ($message) use ($to_name, $to_surname, $to_email, $subject) {
                $message->to($to_email, $to_name, $to_surname)->subject($subject);
                $message->from('support@alogo.com.ua', 'ALOGO | Харьков');
            });

            $result['success'] = true;
            $result['message'] = 'Ваша заказ принят ожидайте звонка менеджера';
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

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
