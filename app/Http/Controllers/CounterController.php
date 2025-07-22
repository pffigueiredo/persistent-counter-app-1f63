<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Counter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CounterController extends Controller
{
    /**
     * Display the counter.
     */
    public function index()
    {
        $counter = Counter::firstOrCreate([], ['count' => 0]);
        
        return Inertia::render('Welcome', [
            'count' => $counter->count
        ]);
    }
    
    /**
     * Increment the counter.
     */
    public function store(Request $request)
    {
        $counter = Counter::firstOrCreate([], ['count' => 0]);
        $counter->increment('count');
        
        return Inertia::render('Welcome', [
            'count' => $counter->count
        ]);
    }

    /**
     * Decrement the counter.
     */
    public function update(Request $request)
    {
        $counter = Counter::firstOrCreate([], ['count' => 0]);
        $counter->decrement('count');
        
        return Inertia::render('Welcome', [
            'count' => $counter->count
        ]);
    }
}