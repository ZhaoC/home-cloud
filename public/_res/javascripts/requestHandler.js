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
                        RequestHandler.toastPostive("File Uploaded!");
                    } else if(result.status === 'rejected'){
                        RequestHandler.toastNegative("Action Rejected!");
                    }
                }
            ).catch(
                err => console.log('error meesage', err.messge)
            );
        },

        RequestHandler.deleteFile = function (url, filePath, deletedDiv) {
            var requestData = {};

            requestData.filePath = filePath;
            fetch(url, {
                method: "POST",
                body: JSON.stringify(requestData),
                headers: new Headers({
                    'Content-Type': 'application/json'
                  })
            }).then(
                response => response.json()
            ).then(
                result => {
                    console.log('Result content:', result);
                    if (result.status === 'success') {
                        RequestHandler.toastPostive("File Deleted!");
                        // remove div for delete data
                        deletedDiv.remove();
                    } else if(result.status === 'failed'){
                        RequestHandler.toastNegative("Action Failed!");
                    }
                }
            ).catch(
                err => console.log('error meesage', err.messge)
            );
        },

        RequestHandler.toastPostive = function (message) {
            let toastSuccess = document.getElementById("toastSuccess");
            let messageDisplay = document.getElementById("positiveMessage");
            messageDisplay.innerText = message;
            toastSuccess.className = "show";
        },

        RequestHandler.toastNegative = function (message) {
            let toastReject = document.getElementById("toastReject");
            let messageDisplay = document.getElementById("negativeMessage");
            messageDisplay.innerText = "Action Failed!";
            toastReject.className = "show";
        }

        return RequestHandler;
    }

    if (typeof (RequestHandler) === 'undefined') {
        window.RequestHandler = define_library();
    } else {
        console.log("RequestHandler has already been defined.");
    }
})(window);