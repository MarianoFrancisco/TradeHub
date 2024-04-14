<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PublicationState;

class PublicationStateController extends Controller
{
    public function getPublicationStateName($id)
    {
        $publicationStateName = PublicationState::where('id', $id)->value('name');
        if ($publicationStateName) {
            return response()->json($publicationStateName);
        } else {
            return response()->json(['error' => 'No se encontró el estado de publicacion'], 404);
        }
    }

    public function getPublicationState()
    {
        $publication = PublicationState::all();
        return response()->json($publication);
    }
}
