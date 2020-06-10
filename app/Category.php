<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function cars()
    {
        return $this->belongsTo('App\Cars', 'car_id', 'id');
    }

    public function products()
    {
        return $this->hasMany('App\Product', 'category_id', 'id');
    }
}
