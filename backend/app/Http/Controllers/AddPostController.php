<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\AddPostNotification;
use App\Models\User;
use App\Models\Post;
use App\Notifications\DeletePostNotification;


class AddPostController extends Controller
{
    public function addNotification(Request $request)
    {
        $user = $request->user();
        $allUsers = User::all();
        $messageUsers = "➕ New Post Added By $user->name";
        $message = "➕ New Post Added By You!";

        $user->notify(new AddPostNotification($message));

        foreach ($allUsers as $u) {
            if ($u->id !== $user->id) {
                $u->notify(new AddPostNotification($messageUsers));
            }
        }
        return response()->json([
            'message' => 'Post Notification Sent Successfully!'
        ]);
    }

    public function deleteNotification(Request $request)
    {
        $user = $request->user();
        $message = "Post Notification!...You Delete A Post";
        $user->notify(new DeletePostNotification($message));
    }
}
