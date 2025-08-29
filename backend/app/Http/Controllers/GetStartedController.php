<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GetStartedController extends Controller
{
    public function status(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'has_started' => $user->has_started,
        ]);
    }

    public function start(Request $request)
    {
        $user = $request->user();

        if ($user->has_started) {
            return response()->json(['message' => 'Already started'], 400);
        }

        $user->has_started = true;
        $user->save();

        return response()->json(['message' => 'Started successfully']);
    }
}
