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
            $('#list-task').append(
                '<li id="task-'+ response.id + '">' + 
                '<span>' + response.name + '</span>' + ' - ' +
                '<span class="task-status">Not Completed </span>' +
                '<input type="checkbox" class="toggle-btn" data-id="' + response.id + '">' +
                '<button class="delete-btn" data-id="' + response.id + '">Delete</button>' +
                '</li>'
            );
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
            $('#task-' + task_id + " .task-status").text(response.is_completed ? 'Completed' : 'Not Completed'); // change the status
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
            $('#message-delete').text(response.message); // display the success message
        },
    });
}

$('#add-task-form').on('submit', addTask);
$(document).on('change', '.toggle-btn', toggleTask);
 $(document).on('click', '.delete-btn', deleteTask);