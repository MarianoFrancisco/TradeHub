<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\User;

class UserController extends Controller
{
    public function auth($username, $password)
    {
        try {
            $user = User::where('user_name', $username)->where('pwd', $password)->firstOrFail();
            return response()->json($user);
        } catch (ModelNotFoundException $exception) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    public function save(Request $request)
    {
        // Valida los datos del request
        $request->validate([
            'user_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'pwd' => 'required|string',
            'birthdate' => 'required|date',
            'phone' => 'required|string|max:30',
            'rol_id' => 'required',
        ]);
        // Crea un nuevo usuario con los datos del request
        $user = new User([
            'user_name' => $request->user_name,
            'name' => $request->name,
            'pwd' => $request->pwd, // Se recomienda encriptar la contraseña
            'birthdate' => $request->birthdate,
            'phone' => $request->phone,
            'rol_id' => $request->rol_id,
        ]);
        // Guarda el usuario en la base de datos
        $user->save();
        $user = User::where('user_name', $user->user_name)->first();
        $coinController = new CoinController();
        $coinController::class::createCoin($user->id);
        // Retorna una respuesta adecuada
        return response()->json(['message' => 'Usuario creado correctamente'], 201);
    }

    public function getUserName($id)
    {
        $userName = User::where('id', $id)->value('name');
        if ($userName) {
            return response()->json($userName);
        } else {
            return response()->json(['error' => 'No se encontró el usuario'], 404);
        }
    }
}
