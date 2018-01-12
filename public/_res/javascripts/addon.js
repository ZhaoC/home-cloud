$(document).on('click', '#browseBtn', function () {
    $('#fileInput').trigger('click');
});

$(document).on('change', '#fileInput', function () {
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, '')); //get rid of fakepath... in chrome
});