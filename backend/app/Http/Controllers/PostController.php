<?php
// app/Http/Controllers/PostController.php
namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Like;
use App\Models\Comment;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
        ]);

        return response()->json($post, 201);
    }

    public function like(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'post_id' => 'required|exists:posts,id',
        ]);

        $alreadyLiked = Like::where('user_id', $request->user_id)
            ->where('post_id', $request->post_id)
            ->exists();

        if ($alreadyLiked) {
            return response()->json(['message' => 'Already liked'], 409);
        }

        Like::create([
            'user_id' => $request->user_id,
            'post_id' => $request->post_id
        ]);

        Post::where('id', $request->post_id)->increment('likes_count');

        return response()->json(['message' => 'Post liked']);
    }


    public function comment(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'comment' => 'required|string'
        ]);
        Comment::create([
            'user_id' => $request->user()->id,
            'post_id' => $request->post_id,
            'comment' => $request->comment,
        ]);
        $post = Post::find($request->post_id);
        $post->increment('comments_count');
        return response()->json([
            'message' => 'Comment added',
            'comments_count' => $post->comments_count
        ]);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $userId = $user->id;

        $posts = Post::with(['user', 'likes', 'comments'])
            ->withCount(['likes', 'comments'])
            ->with(['likes' => function ($q) use ($userId) {
                $q->where('user_id', $userId);
            }])
            ->where('user_id', '!=', $userId)
            ->latest()
            ->get()
            ->map(function ($post) {
                $post->liked_by_user = $post->likes->isNotEmpty();
                unset($post->likes);
                return $post;
            });

        return response()->json($posts);
    }

    public function myPosts(Request $request)
    {
        $user = $request->user();

        return Post::with(['user', 'likes', 'comments'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();
    }

    public function deletePost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);

        Post::find($request->post_id)->delete();
        return response()->json([
            'message' => 'Post Deleted Successfully!'
        ]);
    }
}
