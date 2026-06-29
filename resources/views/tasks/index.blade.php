<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <title>To-Do List</title>
</head>

<body class="bg-light">
    <div class="container mt-5" style="max-width: 600px">
        <h1 class="mb-4">To-Do List</h1>

        <div class="input-group mb-4">
            <form id="add-task-form" class="d-flex w-100">
                <input type="text" id="task-name" name="name" class="form-control me-2" placeholder="task name" required>
                <button type="submit" class="btn btn-primary">Add Task</button>
            </form>
        </div>

        @if($tasks->isNotEmpty())
            <table class="table table-bordered table-hover table-striped mb-5">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="list-task">
                    @foreach ($tasks as $task)
                    <tr id="task-{{ $task->id }}">
                        <th><?php echo $task->id; ?></th>
                        <td class="task-name">{{ $task->name }}</td>
                        <td>
                            <span class="badge {{ $task->is_completed ? 'bg-success' : 'bg-warning' }} task-status"> 
                                {{ $task->is_completed ? 'Completed' : 'Not Completed' }}
                            </span>
                        </td>
                        <td class="d-flex gap-2">
                            <button class="toggle-btn btn btn-warning btn-sm text-white" data-id="{{ $task->id}}">{{ $task->is_completed ? 'Undone' : 'Done'}}</button>
                            <button class="edit-btn btn btn-info btn-sm text-white" data-id="{{ $task->id}}">Edit</button>
                            <button class="delete-btn btn btn-danger btn-sm" data-id="{{ $task->id}}">Delete</button>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @else 
            <span class="alert alert-info d-flex justify-content-center w-50 mx-auto"> No tasks yet. </span>
        @endif

        <div id="message-delete" class="alert alert-danger alert-dismissible fade show d-none d-flex justify-content-center w-50 mx-auto">
            <button type="button" class="btn-close" id="close-alert" aria-label="Close">
            </button>
            <span> Task deleted successfully </span>
        </div>
    </div>
    
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="{{ asset('js/tasks.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>