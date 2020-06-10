<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = [
        'status'
    ];
    public function category()
    {
        return $this->belongsTo('App\Category', 'category_id', 'id');
    }

    public function images()
    {
        return $this->hasMany('App\ProductGallery', 'product_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany('App\Comment', 'product_id', 'id');
    }
}
