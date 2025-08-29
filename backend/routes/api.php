<?php

use App\Http\Controllers\AddPostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\UserNotification;
use App\Http\Controllers\GetStartedController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Broadcast::routes(['middleware' => ['auth:sanctum']]);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user-status', function (Request $request) {
    return response()->json([
        'get_started' => $request->user()->get_started,
    ]);
});


Route::post('/system-main', [UserNotification::class, 'systemMain']);

Route::middleware(('auth:sanctum'))->group(function () {
    Route::get('/notifications', [UserNotification::class, 'index']);
    Route::post('/notifications/read', [UserNotification::class, 'markAsRead']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/system-notification', [UserNotification::class, 'systemNotification']);
    Route::delete('/delete-notification', [UserNotification::class, 'deleteNotification']);
    Route::post('/notifications/mark-all-read', [UserNotification::class, 'markAllAsRead']);
    Route::delete('/notifications/delete-multiple', [UserNotification::class, 'deleteMultiple']);
    Route::get('/get-user', [AuthController::class, 'getUser']);
    Route::post('/notify-user', [UserNotification::class, 'notifyUser']);
    Route::post('/message-user', [ChatMessageController::class, 'messageUser']);
    Route::post('/add-post-notification', [AddPostController::class, 'addNotification']);
    Route::post('/delete-notification', [AddPostController::class, 'deleteNotification']);
    Route::post('/user-messages',[ChatMessageController::class, 'getUserMessage']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/my-posts', [PostController::class, 'myPosts']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::post('/posts-like', [PostController::class, 'like']);
    Route::post('/posts-comment', [PostController::class, 'comment']);
    Route::delete('/delete-post', [PostController::class, 'deletePost']);
});
