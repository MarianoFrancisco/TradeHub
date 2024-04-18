<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PublicationReport;

class PublicationReportController extends Controller
{
    public function save(Request $request)
    {
        $publicationController = new PublicationController();
        $request->validate([
            'users_id' => 'required',
            'publication_id' => 'required',
            'description' => 'required|string'
        ]);
        $publicationReport = new PublicationReport([
            'users_id' => $request->users_id,
            'publication_id' => $request->publication_id,
            'description' => $request->description,
            'date' => now()->format('Y-m-d')
        ]);
        $alreadyReport = $publicationController::class::alreadyReportPublication($request->publication_id);
        if ($alreadyReport) {
            $publicationReport->save();
            return response()->json(['message' => 'Publicacion ya reportada'], 201);
        }
        $publicationController::class::reportStatePublication($request->publication_id);
        $publicationReport->save();
        return response()->json(['message' => 'Reporte de publicacion creado exitosamente'], 201);
    }

    public static function deleteReports($id)
    {
        $publicationReports = PublicationReport::where("publication_id", $id)->get();
        $publicationReports->each->delete();
        return response()->json(['message' => 'Reportes eliminados exitosamente'], 201);
    }

    public static function getReportPublication($id)
    {
        $publication = PublicationReport::where("publication_id", $id)->get();
        return response()->json($publication);
    }
}
