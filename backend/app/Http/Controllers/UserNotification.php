<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\SystemNotification;
use App\Models\User;
use App\Notifications\NotifyUser;
use App\Notifications\SystemMaintainance;
use App\Notifications\MessageUser;

class UserNotification extends Controller
{
    public function systemNotification(Request $request)
    {
        $user = $request->user();

        if ($user->get_started) {
            return response()->json(['message' => 'You’ve already clicked'], 409);
        }

        $user->get_started = true;
        $user->save();

        $name = $user->name;
        $users = User::all();

        $oneMessage = "Hi! $name From System. Welcome To Our Application. Interact Freely with other Users.";
        $allMessage = "New User: $name Joined Our Application. Welcome Them!";

        $user->notify(new SystemNotification($oneMessage));

        foreach ($users as $u) {
            if ($u->id !== $user->id) {
                $u->notify(new SystemNotification($allMessage));
            }
        }

        return response()->json(['message' => 'Notification sent']);
    }

    public function notifyUser(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $sender = $request->user();

        $recipient = User::findOrFail($request->user_id);

        $message = "🖐 Hi {$recipient->name}! {$sender->name} notified you ✉";

        $recipient->notify(new NotifyUser($message));

        return response()->json(['message' => 'User notified successfully']);
    }

   


    public function systemMain(Request $request)
    {
        $users = User::all();
        $message = "System Is Under Mainatainance For Some Time!.
        Thank You For Your Coorporation!";
        foreach ($users as $user) {
            $user->notify(new SystemMaintainance($message));
        }
        return response()->json([
            'message' => 'Notification Sent!'
        ]);
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications()->latest()->get();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $user->unreadNotifications()->count()
        ]);
    }

    public function markAsRead(Request $request)
    {
        $user = $request->user();
        $notificationId = $request->input('notification_id');

        if (!$notificationId) {
            return response()->json(['message' => 'Notification ID is required'], 400);
        }

        $notification = $user->notifications()->where('id', $notificationId)->first();

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        if ($notification->read_at === null) {
            $notification->markAsRead();
            return response()->json(['message' => 'Notification marked as read']);
        }

        return response()->json(['message' => 'Notification already read']);
    }

    public function deleteNotification(Request $request)
    {
        $user = $request->user();
        $notificationId = $request->input('notification_id');

        if (!$notificationId) {
            return response()->json(['message' => 'Notification ID is required'], 400);
        }
        $notification = $user->notifications()->where('id', $notificationId)->first();

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        $notification->delete();
        return response()->json(['message' => 'Notification deleted successfully']);
    }
    public function markAllAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return response()->json(['message' => 'All marked as read']);
    }

    public function deleteMultiple(Request $request)
    {
        $ids = $request->input('ids');

        if (!$ids || !is_array($ids)) {
            return response()->json(['message' => 'Invalid request'], 400);
        }

        $user = $request->user();

        $user->notifications()->whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Notifications deleted successfully']);
    }
}
