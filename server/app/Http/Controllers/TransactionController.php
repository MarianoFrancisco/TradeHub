<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function save(Request $request)
    {
        $request->validate([
            'buyer_users_id' => 'required',
            'seller_users_id' => 'required',
            'publication_id' => 'required',
            'publication_type_id' => 'required',
            'quantity' => 'required',
            'unity_price' => 'required',
            'description' => 'required|string',
            'total' => 'required',
            'coin' => 'required'
        ]);
        $transaction = new Transaction([
            'buyer_users_id' => $request->buyer_users_id,
            'seller_users_id' => $request->seller_users_id,
            'publication_id' => $request->publication_id,
            'publication_type_id' => $request->publication_type_id,
            'quantity' => $request->quantity,
            'unity_price' => $request->unity_price,
            'date' => now()->format('Y-m-d'),
            'description' => $request->description,
            'total' => $request->total
        ]);
        $publicationController = new PublicationController();
        $publicationController::class::reducedQuantity(
            $transaction->publication_id,
            $transaction->quantity
        );
        $coinController = new CoinController();
        $coinController::class::processTransaction(
            $transaction->buyer_users_id,
            $transaction->seller_users_id,
            $transaction->publication_type_id,
            $transaction->total,
            $request->coin
        );
        $transaction->save();
        return response()->json(['message' => 'Transaccion creada exitosamente'], 201);
    }
}
