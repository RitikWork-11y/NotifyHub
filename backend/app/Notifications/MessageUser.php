<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class MessageUser extends Notification
{
    use Queueable;

    protected string $message;
    protected string $sender;

    public function __construct(string $message, string $sender)
    {
        $this->message = $message;
        $this->sender  = $sender;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'title'   => "Message From {$this->sender}",
            'type'    => 'message',
            'message' => $this->message,
            'sender'  => $this->sender,
        ];
    }
}
