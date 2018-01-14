$(document).on('click', '#browseBtn', function () {
    $('#fileInput').trigger('click');
});

$(document).on('change', '#fileInput', function () {
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, '')); //get rid of fakepath... in chrome
});

function refresh(){
    location.reload();
};

function hideToast(id){
    let toast = document.getElementById(id);
    toast.className = toast.className.replace("show", "");
}