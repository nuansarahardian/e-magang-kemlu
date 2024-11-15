<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends Notification
{
    protected $verifyUrl;

    public function __construct($verifyUrl)
    {
        $this->verifyUrl = $verifyUrl;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Hello!')
            ->line('Please click the button below to verify your email address.')
            ->action('Verify Email Address', $this->verifyUrl)
            ->line('If you did not create an account, no further action is required.');
    }
}
