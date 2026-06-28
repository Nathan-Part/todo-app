<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
</head>

<body>
    <h1>To-Do List</h1>
    <ul>
        @foreach ($tasks as $task)
        <li>{{ $task->name }} - {{ $task->is_completed ? 'Completed' : 'Not Completed' }}</li>
        @endforeach
    </ul>
</body>

</html>