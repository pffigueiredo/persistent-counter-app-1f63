<?php

use App\Http\Controllers\CounterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Counter routes for the home page
Route::get('/', [CounterController::class, 'index'])->name('home');
Route::post('/counter', [CounterController::class, 'store'])->name('counter.store');
Route::patch('/counter', [CounterController::class, 'update'])->name('counter.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
