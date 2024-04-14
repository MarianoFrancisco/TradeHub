<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publication;
use DateTime;
class PublicationController extends Controller
{
    public function save(Request $request)
    {
        // Valida los datos del request
        $request->validate([
            'users_id' => 'required',
            'publication_type_id' => 'required',
            'category_id' => 'required',
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'required',
            'quantity' => 'required',
            'unity_price' => 'required',
        ]);
        $image = $request->file('image');
        $nombreArchivo = time() . '-' . $image->getClientOriginalName();
        $image->move(public_path('img'), $nombreArchivo);
        // Crea un nueva publicacion con los datos del request
        $publication = new Publication([
            'users_id' => $request->users_id,
            'publication_type_id' => $request->publication_type_id,
            'category_id' => $request->category_id,
            'publication_state_id' => 1,
            'title' => $request->title,
            'description' => $request->description,
            //'image' => 'http://www.internal.tradehub.gt/img/logo.jpg',// . $nombreArchivo, // Guardar el nombre del archivo en lugar de la imagen real
            'image' => 'http://www.internal.tradehub.gt/img/' . $nombreArchivo,
            'quantity' => $request->quantity,
            'unity_price' => $request->unity_price,
            'date' => (new DateTime())->format('Y-m-d')
        ]);
        // Guardar la nueva publicación en la base de datos
        $publication->save();
        return response()->json(['message' => 'Publicación creada exitosamente'], 201);
    }

    public function getAll()
    {
        $publications = Publication::all();
        return response()->json($publications);
    }

    public function getPublication($id)
    {
        $publication = Publication::where("id", $id)->first();
        return response()->json($publication);
    }

    public function getPublicationsUser($id)
    {
        $publication = Publication::where("users_id", $id)->get();
        return response()->json($publication);
    }

    public function getPublicationsUserFilter($id, $state)
    {
        $publications = Publication::where("users_id", $id)
            ->where("publication_state_id", $state)
            ->get();
        return response()->json($publications);
    }

    public function deletePublication($id)
    {
        try {
            $publication = Publication::findOrFail($id);
            $publication->delete();
            return response()->json(['message' => 'Publicación eliminada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la publicación'], 500);
        }
    }

    public function reviewPublication(Request $request, $id)
    {
        try {
            $state = $request->input('state');
            $publication = Publication::find($id);
            $publication->update(['publication_state_id' => $state]);
            return response()->json(['message' => 'Publicación actualizada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function reviewAdminPublication($stateReview, $stateReport)
    {
        try {
            $publications = Publication::whereIn('publication_state_id', [$stateReview, $stateReport])->get();
            return response()->json($publications);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
