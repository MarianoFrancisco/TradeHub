<?php

namespace App\Http\Controllers;
use App\Models\Coin;

use Illuminate\Http\Request;

class CoinController extends Controller
{
    public function coin($id)
    {
        $coin = Coin::where("users_id",$id)->first();
        if ($coin) {
            return response()->json($coin);
        } else {
            return null;
        }
    }
}
