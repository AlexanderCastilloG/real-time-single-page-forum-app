<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    // cambiar el id por el slug
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
