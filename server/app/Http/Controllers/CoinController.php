<?php

namespace App\Http\Controllers;

use App\Models\Coin;

use Illuminate\Http\Request;

class CoinController extends Controller
{
    public function coin($id)
    {
        $coin = Coin::where("users_id", $id)->first();
        if ($coin) {
            return response()->json($coin);
        } else {
            return null;
        }
    }

    public function buyArcane(Request $request)
    {
        $request->validate([
            'number' => 'required|string',
            'expiration' => 'required|string',
            'code' => 'required|string',
            'name' => 'required|string',
            'users_id' => 'required',
            'quantity' => 'required'
        ]);
        $oldCoin = Coin::where("users_id", $request->users_id)->first();
        $newArcane = $oldCoin->system_coin + $request->quantity;
        $oldCoin->update(['system_coin' => $newArcane]);
        $coin = Coin::where("users_id", $request->users_id)->first();
        if ($coin) {
            return response()->json($coin);
        } else {
            return null;
        }
    }

    public function withDrawArcane(Request $request)
    {
        $request->validate([
            'number' => 'required|string',
            'expiration' => 'required|string',
            'code' => 'required|string',
            'name' => 'required|string',
            'users_id' => 'required',
            'quantity' => 'required'
        ]);
        $oldCoin = Coin::where("users_id", $request->users_id)->first();
        $newArcane = $oldCoin->system_coin - $request->quantity;
        if ($newArcane < 0) {
            return response()->json(['message' => 'El valor de $oldCoin es menor que 0'], 422);
        }
        $oldCoin->update(['system_coin' => $newArcane]);
        $coin = Coin::where("users_id", $request->users_id)->first();
        if ($coin) {
            return response()->json($coin);
        } else {
            return null;
        }
    }

    public static function processTransaction($buyer, $seller, $type, $total, $coin)
    {
        $buyerCoin = Coin::where("users_id", $buyer)->first();
        $sellerCoin = Coin::where("users_id", $seller)->first();
        if ($type == 4 || $type == 1) {
            if ($coin === 1) {
                $newBuyerCoin = $buyerCoin->system_coin + $total;
                $newSellerCoin = $sellerCoin->system_coin - $total;
                $buyerCoin->update(['system_coin' => $newBuyerCoin]);
                $sellerCoin->update(['system_coin' => $newSellerCoin]);
            } else {
                $newBuyerCoin = $buyerCoin->volunteerism_coin + $total;
                $newSellerCoin = $sellerCoin->volunteerism_coin - $total;
                $buyerCoin->update(['volunteerism_coin' => $newBuyerCoin]);
                $sellerCoin->update(['volunteerism_coin' => $newSellerCoin]);
            }
        } else {
            if ($coin === 1) {
                $newBuyerCoin = $buyerCoin->system_coin - $total;
                $buyerCoin->update(['system_coin' => $newBuyerCoin]);
            } else {
                $newBuyerCoin = $buyerCoin->volunteerism_coin - $total;
                $buyerCoin->update(['volunteerism_coin' => $newBuyerCoin]);
            }
            $newSellerCoin = $sellerCoin->system_coin + $total;
            $sellerCoin->update(['system_coin' => $newSellerCoin]);
        }
    }

    public static function createCoin($id)
    {
        $coin = new Coin([
            'users_id' => $id,
            'system_coin' => 0,
            'volunteerism_coin' => 0,
        ]);
        $coin->save();
        return response()->json(['message' => 'Moneda creada exitosamente'], 201);
    }

}
