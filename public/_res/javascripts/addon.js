$(document).on('click', '#browse-btn', function () {
    $('#fileinput').trigger('click');
});

$(document).on('change', '#fileinput', function () {
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, '')); //get rid of fakepath... in chrome
});