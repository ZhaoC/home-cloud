$(document).on('click', '#browseBtn', function () {
    $('#fileInput').trigger('click');
});

$(document).on('change', '#fileInput', function () {
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, '')); //get rid of fakepath... in chrome
});

function refresh() {
    location.reload();
};

function hideToast(id) {
    let toast = document.getElementById(id);
    toast.className = toast.className.replace("show", "");
};

$('.img-wrap .delete-image').on('click', function () {
    var imgDiv = $(this).closest('.img-wrap');
    var path = imgDiv.find('img').data('id');
    
    var url = '/delete';
    // alert('remove picture: ' + id);
    RequestHandler.deleteFile(url, path, imgDiv);
});