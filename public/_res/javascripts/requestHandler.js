(function(window){  
    'use strict';
    function define_library(){
        var RequestHandler = {}; 

        RequestHandler.uploadFile = function(url, formId){

            var form = document.getElementById('myform');
            var formdata = new FormData(form);

            fetch(url, {
                method: "POST",
                body: formdata
                }
            ).then(
                response => response.text()
            ).then(
                result => console.log('Result content:', result)
            ).catch(
                err => console.log('error meesage', err.messge)
            );
        }

        return RequestHandler;
    }

    if(typeof(RequestHandler) === 'undefined'){
        window.RequestHandler = define_library();
    }
    else{
        console.log("RequestHandler has already been defined.");
    }
})(window);