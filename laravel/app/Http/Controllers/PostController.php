<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = request()->input('per_page', 2); // Get per_page from request or default to 15
        $data = Post::paginate($perPage);
        // return Post::all();
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userName = $request->user()->name;

        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'category' => 'required'
        ]);
        
        $payload = [
            'title' => $request->title,
            'content' => $request->content,
            'category' => $request->category,
            "date" => date('Y-m-d'),
            "author" => ucwords($userName),
        ];

        $post = Post::create($payload);
        return response()->json($post, 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return $post;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validatedData = $request->validate([
            'title' => 'sometimes|required',
            'content' => 'sometimes|required',
            'category' => 'sometimes|required'
        ]);

        $post->update($validatedData);
        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(null, 204); // 204 No Content
    }
}
