<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function save(Request $request)
    {
        // Valida los datos del request
        $request->validate([
            'seller' => 'required',
            'buyer' => 'required',
            'publication' => 'required',
        ]);
        // Crea un nuevo usuario con los datos del request
        $user = new Chat([
            'user_name' => $request->seller,
            'name' => $request->buyer,
            'pwd' => $request->publication, // Se recomienda encriptar la contraseña
            'birthdate' => $request->birthdate,
            'phone' => $request->phone,
            'rol_id' => $request->rol_id,
        ]);
        // Guarda el usuario en la base de datos
        $user->save();
        // Retorna una respuesta adecuada
        return response()->json(['message' => 'Usuario creado correctamente'], 201);
    }
}
