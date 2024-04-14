<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PublicationType;

class PublicationTypeController extends Controller
{
    public function getPublicationTypeName($id)
    {
        $publicationTypeName = PublicationType::where('id', $id)->value('name');
        if ($publicationTypeName) {
            return response()->json($publicationTypeName);
        } else {
            return response()->json(['error' => 'No se encontró el tipo de publicacion'], 404);
        }
    }

    public function getPublicationType()
    {
        $publication = PublicationType::all();
        return response()->json($publication);
    }

    public function getPublicationTypeId($name)
    {
        $publicationTypeId = PublicationType::where('name', $name)->value('id');
        if ($publicationTypeId) {
            return response()->json($publicationTypeId);
        } else {
            return response()->json(['error' => 'No se encontró el tipo de publicacion'], 404);
        }
    }
}
