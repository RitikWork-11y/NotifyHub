<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\MessageUser;
use App\Models\User;
use App\Models\ChatMessage;
use App\Events\MessageSent;

class ChatMessageController extends Controller
{
    public function messageUser(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string|max:255'
        ]);

        $sender = $request->user();
        $recipient = User::findOrFail($request->user_id);

        $message = ChatMessage::create([
            'sender_id' => $sender->id,
            'receiver_id' => $recipient->id,
            'message' => $request->message
        ]);

       
        broadcast(new MessageSent($message))->toOthers();

        
        $recipient->notify(new MessageUser($message->message, $sender->name));

        return response()->json([
            'message' => 'Message sent successfully!',
            'data' => $message
        ]);
    }

    public function getUserMessage(Request $request)
    {
        $request->validate([
            'selected_user_id' => 'required|exists:users,id'
        ]);

        $authUserId = $request->user()->id;
        $selectedUserId = $request->selected_user_id;

        $messages = ChatMessage::where(function ($query) use ($authUserId, $selectedUserId) {
                $query->where('sender_id', $authUserId)
                      ->where('receiver_id', $selectedUserId);
            })
            ->orWhere(function ($query) use ($authUserId, $selectedUserId) {
                $query->where('sender_id', $selectedUserId)
                      ->where('receiver_id', $authUserId);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'messages' => $messages
        ]);
    }
}
