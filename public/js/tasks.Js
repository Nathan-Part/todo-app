$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') 
    }
}); 

function addTask(e) {
    
    e.preventDefault();

    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: {
            name: $('#task-name').val(),
        },
        success: function (response) { // display the new task in the list
            if ($('#list-task').length === 0) {
                $('.alert-info').remove();
                $('div.container').append(`
                    <table class="table table-bordered table-hover table-striped mb-5">
                        <thead class="table-light">
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="list-task"></tbody>
                    </table>
                `);
            }
            $('#list-task').append(`
                <tr id="task-${response.id}">
                    <th>${response.id}</th>
                    <td>${response.name}</td>
                    <td>
                        <span class="badge bg-warning task-status">Not Completed</span>
                    </td>
                    <td class="d-flex gap-2">
                        <button class="toggle-btn btn btn-warning btn-sm text-white" data-id="${response.id}">Done</button>
                        <button class="delete-btn btn btn-danger btn-sm" data-id="${response.id}">Delete</button>
                    </td>
                </tr>
            `);
            $('#task-name').val('');
        }
    })
}


function toggleTask(){
     var task_id = $(this).data('id'); // get the id of the task with the data-id attribute

    $.ajax({
        url: "/tasks/" + task_id + "/toggle",
        method: 'POST',
        success: function (response) {
            $('#task-' + task_id + " .task-status").text(response.is_completed ? 'Completed' : 'Not Completed') // update the status text
            .removeClass('bg-success bg-warning') // remove the previous background color
            .addClass(response.is_completed ? 'bg-success' : 'bg-warning'); // add the new background color

            $('#task-' + task_id + " .toggle-btn").text(response.is_completed ? 'Undone' : 'Done'); // update the status text with the new status
        },
    });
}

function deleteTask(){
    var task_id = $(this).data('id');

    $.ajax({
        url: "/tasks/" + task_id,
        method: 'DELETE',
        success: function (response) {
            $('#task-' + task_id).remove();
            if ($('#list-task tr').length === 0) {
                $('.table').remove();
                $('div.container').append('<span class="alert alert-info d-flex justify-content-center w-50 mx-auto"> No tasks yet. </span>');
            }
            $('#message-delete').removeClass('d-none').text(response.message); // display the success message
        },
    });
}

$('#add-task-form').on('submit', addTask);
$(document).on('click', '.toggle-btn', toggleTask);
$(document).on('click', '.delete-btn', deleteTask);