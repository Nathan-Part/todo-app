$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('#add-task-form').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: {
            name: $('#task-name').val(),
        },
        success: function (response) {
            $('ul').append('<li>' + response.name + '- Not Completed</li>');
            $('#task-name').val('');
        }
    })
})

$(document).on('change', '.toggle-btn', function () {
     var task_id = $(this).data('id');

    $.ajax({
        url: "/tasks/" + task_id + "/toggle",
        method: 'POST',
        success: function (response) {
            $('#task-' + task_id + " .task-status").text(response.is_completed ? 'Completed' : 'Not Completed');
        },
        error:function(error){
            console.log(error);
        }
    });
})