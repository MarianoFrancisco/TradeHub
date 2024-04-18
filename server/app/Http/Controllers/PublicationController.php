<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publication;

class PublicationController extends Controller
{
    public function save(Request $request)
    {
        $request->validate([
            'users_id' => 'required',
            'publication_type_id' => 'required',
            'category_id' => 'required',
            'title' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image',
            'quantity' => 'required',
            'unity_price' => 'required',
        ]);
        $image = $request->file('image');
        $nombreArchivo = time() . '-' . $image->getClientOriginalName();
        $image->storeAs('img', $nombreArchivo, 'public');
        $publication = new Publication([
            'users_id' => $request->users_id,
            'publication_type_id' => $request->publication_type_id,
            'category_id' => $request->category_id,
            'publication_state_id' => 1,
            'title' => $request->title,
            'description' => $request->description,
            'image' => $nombreArchivo,
            'quantity' => $request->quantity,
            'unity_price' => $request->unity_price,
            'date' => now()->format('Y-m-d')
        ]);
        $publication->save();
        return response()->json(['message' => 'Publicación creada exitosamente'], 201);
    }

    public function getAllExcept($id)
    {
        $publications = Publication::whereNotIn('users_id', [$id])
            ->whereNotIn('publication_state_id', [1, 4, 5])
            ->get();
        return response()->json($publications);
    }

    public function getAllExceptFilter($id, $type)
    {
        $publications = Publication::where("publication_type_id", $type)
            ->whereNotIn('publication_state_id', [1, 4, 5])
            ->whereNotIn('users_id', [$id])->get();
        return response()->json($publications);
    }

    public function getPublication($id)
    {
        $publication = Publication::where("id", $id)->first();
        return response()->json($publication);
    }

    public static function alreadyReportPublication($id)
    {
        $publication = Publication::where("id", $id)
            ->where("publication_state_id", 3)
            ->first();
        return $publication;
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
            $report = $this::alreadyReportPublication($id);
            $publication->update(['publication_state_id' => $state]);
            if ($report) {
                $publicationReportController = new PublicationReportController();
                $publicationReportController->deleteReports($id);
                return response()->json(['message' => 'Publicacion revisada correctamente y reportes eliminados'], 200);
            }
            return response()->json(['message' => 'Publicación revisada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public static function reportStatePublication($id)
    {
        try {
            $publication = Publication::find($id);
            $publication->update(['publication_state_id' => 3]);
            return response()->json(['message' => 'Publicación actualizada a reportada']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function reviewAdminPublication($stateReview)
    {
        try {
            $publications = Publication::whereIn('publication_state_id', [$stateReview])->get();
            return response()->json($publications);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public static function reducedQuantity($id, $quantity)
    {
        $publication = Publication::find($id);
        $newQuantity = $publication->quantity - $quantity;
        $publication->update(['quantity' => $newQuantity]);
        return response()->json($publication);
    }
}
