<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        // Validar la solicitud y asegurarse de que se haya enviado un archivo
        $request->validate([
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]); 

        // Guardar el archivo en el directorio de almacenamiento
        $imagen = $request->file('imagen');
        $nombreArchivo = time() . '-' . $imagen->getClientOriginalName();
        $imagen->move(public_path('img'), $nombreArchivo);

        // Devolver una respuesta con la ruta del archivo subido
        return response()->json(['ruta' => 'http://www.internal.tradehub.gt/img/' . $nombreArchivo]);
    }   
}
