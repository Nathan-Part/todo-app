<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index() // display all tasks
    {
        $tasks = Task::all();
        return view('tasks.index', compact('tasks'));
    }

    public function store(Request $request) // create a new task 
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $task = Task::create([
            'name' => $request->name,
            'is_completed' => false,
        ]);

        return response()->json($task); // return the value of the new task for the ajax request to display it in the list
    }

    public function toggle(Task $task) // toggle the completion status of a task
    {
        $task->update(['is_completed' => !$task->is_completed]); // take the current value and set it to the opposite value 

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}
