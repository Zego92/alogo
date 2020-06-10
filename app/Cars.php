<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cars extends Model
{
    public function category()
    {
        return $this->hasMany('App\Category', 'car_id', 'id');
    }
}
