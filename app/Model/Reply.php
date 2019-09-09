<?php

namespace App\Model;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected static function boot(){
        
        parent::boot();

        static::creating(function(Reply $reply){
            $reply->user_id = auth()->id();
        });
    }

    protected $fillable = ['body'];

    // protected $guarded = ['id', 'created_at', 'updated_at'];

    public function question() {
        return $this->belongsTo(Question::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    //likes
    public function like() {
        return $this->hasMany(Like::class);
    }
}
