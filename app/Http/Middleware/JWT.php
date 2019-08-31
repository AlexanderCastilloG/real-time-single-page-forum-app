<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Token esta autenticado
        /* si la linea es true pasa al siguiente request 
        pero si es false devuelve un tipo de exception*/
        JWTAuth::parseToken()->authenticate();
        return $next($request);


        //Para obtener el token de la solicitud, puede hacer:
        // esto establecerá el token en el objeto
        // JWTAuth::parseToken();

        // y puedes continuar encadenando métodos
        // $user = JWTAuth::parseToken()->authenticate();
    }
}
