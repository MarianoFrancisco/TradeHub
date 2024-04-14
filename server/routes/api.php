<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CoinController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PublicationStateController;
use App\Http\Controllers\PublicationTypeController;

/* Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
}); */
/* https://www.youtube.com/watch?v=Tdv0dedPNRQ */
Route::get('/user/{username}/{password}', [UserController::class, 'auth']);
Route::post('/user', [UserController::class, 'save']);

Route::get('/coin/{id}', [CoinController::class, 'coin']);

Route::post('/upload', [UploadController::class, 'upload']);

Route::post('/publication', [PublicationController::class, 'save']);
Route::get('/publications', [PublicationController::class, 'getAll']);
Route::get('/publication/{id}', [PublicationController::class, 'getPublication']);
Route::get('/publication/user/{id}', [PublicationController::class, 'getPublicationsUser']);
Route::get('/publication/user/{id}/filter/{state}', [PublicationController::class, 'getPublicationsUserFilter']);
Route::delete('/publication/{id}', [PublicationController::class, 'deletePublication']);
Route::patch('/publication/review/{id}', [PublicationController::class, 'reviewPublication']);
Route::get('/publication/review/{stateReview}/{stateReport}', [PublicationController::class, 'reviewAdminPublication']);

Route::get('/category/{id}/name', [CategoryController::class, 'getCategoryName']);
Route::get('/category', [CategoryController::class, 'getAllCategory']);

Route::get('/publication_state/{id}/name', [PublicationStateController::class, 'getPublicationStateName']);
Route::get('/publication_state', [PublicationStateController::class, 'getPublicationState']);

Route::get('/publication_type/{id}/name', [PublicationTypeController::class, 'getPublicationTypeName']);
Route::get('/publication_type', [PublicationTypeController::class, 'getPublicationType']);

Route::post('/chat', [PublicationController::class, 'save']);