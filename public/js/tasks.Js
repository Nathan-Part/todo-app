$('#add-task-form').on('submit', function (e) {
    e.preventDefault();

    $.ajax({
        url: '/tasks',
        method: 'POST',
        data: {
            name: $('#task-name').val(),
            _token: $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
            $('ul').append('<li>' + response.name + '- Not Completed</li>');
            $('#task-name').val('');
        }
    })
})