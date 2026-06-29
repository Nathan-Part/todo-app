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
                    <td class="task-name">${response.name}</td>
                    <td>
                        <span class="badge bg-warning task-status">Not Completed</span>
                    </td>
                    <td class="d-flex gap-2">
                        <button class="toggle-btn btn btn-warning btn-sm text-white" data-id="${response.id}">Done</button>
                        <button class="edit-btn btn btn-info btn-sm text-white" data-id="${response.id}">Edit</button>
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
            $('#message-delete').addClass('d-none');
        },
    });
}

function editTask(){
    var task_id = $(this).data('id'); // get the id of the task with the data-id attribute
    var $td = $('#task-' + task_id + ' .task-name');
    var currentName = $td.text().trim(); // get the current name on the table 

    $td.html('<input type="text" class="form-control" value="' + currentName + '">'); // create the input field on table
    $td.find('input').focus();

    $td.find('input').on('blur keypress', function(e) {
        if (e.type === 'blur' || e.which === 13) {
            var newName = $(this).val().trim();

            if(newName !== currentName) {
                $.ajax({
                    url: "/tasks/" + task_id,
                    method: 'PUT',
                    data: { name: newName },
                    success: function (response) {
                        $td.text(response.name);
                    },
                });
            }
            else {
                $td.text(currentName);
            }
        }
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
            $('#message-delete').removeClass('d-none'); // display the success message
        },
    });
}

function filterTasks() {
    var filter = $(this).data('filter');
     
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    $('#list-task tr').each(function(){
        var status = $(this).find('.task-status').text().trim();
        
        if(filter === 'all') {
            $(this).show();
        } else if(filter === 'Completed' && status === 'Completed') {
            $(this).show();
        } else if(filter === 'Not Completed' && status === 'Not Completed') {
            $(this).show();
        } else {
            $(this).hide();
        }
    })
}

$('#add-task-form').on('submit', addTask);
$(document).on('click', '.toggle-btn', toggleTask);
$(document).on('click', '.edit-btn', editTask);
$(document).on('click', '.delete-btn', deleteTask);
$(document).on('click', '.filter-btn', filterTasks);
$(document).on('click', '#close-alert', function() {
    $('#message-delete').addClass('d-none');
});
