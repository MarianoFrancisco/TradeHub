<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{
    public function save(Request $request)
    {
        $request->validate([
            'seller' => 'required',
            'buyer' => 'required',
            'publication' => 'required',
        ]);
        $existingChat = Chat::where('buyer_users_id', $request->buyer)
            ->where('publication_id', $request->publication)
            ->first();
        if ($existingChat) {
            return response()->json(['message' => 'Ya existe un chat para este comprador y publicación', 'chat' => $existingChat], 409);
        }
        $chat = new Chat([
            'buyer_users_id' => $request->buyer,
            'seller_users_id' => $request->seller,
            'publication_id' => $request->publication
        ]);
        $chat->save();
        $saveChat = Chat::where('buyer_users_id', $request->buyer)
            ->where('publication_id', $request->publication)
            ->first();
        return response()->json(['message' => 'Chat creado exitosamente', 'chat' => $saveChat], 201);
    }

    public function getChatsUser($id)
    {
        $chats = Chat::where("buyer_users_id", $id)
            ->orWhere("seller_users_id", $id)
            ->get();
        return response()->json($chats);
    }

    public function getChatsUserClient($id)
    {
        $chats = Chat::where("buyer_users_id", $id)
            ->get();
        return response()->json($chats);
    }

    public function getChatsUserOwner($id)
    {
        $chats = Chat::where("seller_users_id", $id)
            ->get();
        return response()->json($chats);
    }
}
