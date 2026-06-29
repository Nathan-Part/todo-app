<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>To-Do List</title>
</head>

<body>
    <h1>To-Do List</h1>
    <form id="add-task-form">
        <input type="text" id="task-name" name="name" placeholder="task name" required>
        <button type="submit">Add Task</button>
    </form>
    <ul id="list-task">
        @foreach ($tasks as $task)
        <li id="task-{{ $task->id }}">
            <span>{{ $task->name }}</span> - <span class="task-status"> {{ $task->is_completed ? 'Completed' : 'Not Completed' }}</span>
            <input type="checkbox" class="toggle-btn" data-id="{{ $task->id}}" {{ $task->is_completed ? 'checked' : ''}}>
            <button class="delete-btn" data-id="{{ $task->id}}">Delete</button>
        </li>
        @endforeach
    </ul>
    <span id="message-delete"></span>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/tasks.js') }}"></script>
</body>

</html>