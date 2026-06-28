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
    <ul>
        @foreach ($tasks as $task)
        <li>{{ $task->name }} - {{ $task->is_completed ? 'Completed' : 'Not Completed' }}</li>
        @endforeach
    </ul>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/tasks.js') }}"></script>
</body>

</html>