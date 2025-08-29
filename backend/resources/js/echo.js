import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_SERVER_HOST,
    wsPort: import.meta.env.VITE_REVERB_SERVER_PORT,
    forceTLS: false,
    disableStats: true,
});
