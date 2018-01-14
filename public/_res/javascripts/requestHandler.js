(function (window) {
    'use strict';

    function define_library() {
        var RequestHandler = {};

        RequestHandler.uploadFile = function (url, formId) {

            var form = document.getElementById(formId);
            var formdata = new FormData(form);

            fetch(url, {
                method: "POST",
                body: formdata
            }).then(
                response => response.json()
            ).then(
                result => {
                    console.log('Result content:', result);
                    if (result.status === 'success') {
                        let toast = document.getElementById("toast");
                        toast.className = "show"; 
                    }
                }
            ).catch(
                err => console.log('error meesage', err.messge)
            );
        }

        return RequestHandler;
    }

    if (typeof (RequestHandler) === 'undefined') {
        window.RequestHandler = define_library();
    } else {
        console.log("RequestHandler has already been defined.");
    }
})(window);