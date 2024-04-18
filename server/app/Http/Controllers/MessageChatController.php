<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MessageChat;
use DateTime;

class MessageChatController extends Controller
{
    public function getMessageChatUser($id)
    {
        $messageChats = MessageChat::where("chat_id", $id)
            ->get();
        return response()->json($messageChats);
    }

    public function save(Request $request)
    {
        $request->validate([
            'chat_id' => 'required',
            'users_id' => 'required',
            'message' => 'required',
        ]);
        $messageChat = new MessageChat([
            'chat_id' => $request->chat_id,
            'users_id' => $request->users_id,
            'date' => (new DateTime())->format('Y-m-d H:i:s'),
            'message' => $request->message
        ]);
        $messageChat->save();
        return response()->json(['message' => 'Mensaje enviado exitosamente', 'messageChat' => $messageChat], 201);
    }
}
