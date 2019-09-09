<?php

namespace App\Model;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected static function boot() {
        parent::boot();

        static::creating(function (Question $question){
            $question->slug = str_slug($question->title);
        });
    }

    /** $fillable
     * te permite especificar qué campos sí quieres que se guarden en la base de datos. Es decir,
     * se asignan únicamente los especificados en este array.
     */
    protected $fillable = ['title', 'slug', 'body', 'category_id', 'user_id'];

    protected $with = ['replies'];

    /** $guarded
     * permite especificar qué campos no queremos que se asignen al modelo. Es decir,
     * se asignan todos excepto los especificados en este array.
     */
    // protected $guarded = ['id', 'created_at', 'updated_at'];

    // cambiar el id por el Url de la rutas o Slug, todo lo hace laravel internamente
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function replies() {
        return $this->hasMany(Reply::class)->latest();
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    // crear un atributo personalizado
    public function getPathAttribute() {
        // asset -> genera un path de tu aplicación
        // return asset("api/question/$this->slug");
        return "/question/$this->slug";
    }
}
