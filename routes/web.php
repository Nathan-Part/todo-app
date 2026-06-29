<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::get('/', [TaskController::class, 'index']); // use the index method of the TaskController for the main page
Route::post('/tasks', [TaskController::class, 'store']);
Route::post('/tasks/{task}/toggle', [TaskController::class, 'toggle']);
Route::put('/tasks/{task}', [TaskController::class, 'update']); // add a route for updating tasks
Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
