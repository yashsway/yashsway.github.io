function insertText() {
    $.ajax({
        async: true,
        url: 'assets/text/experience.txt',
        dataType: 'text',
        success: function (data) {
            $('#txt-exp').append(data);
        }
    });
}

function responsiveFixes() {}

//onload stuff
$(document).ready(function () {
    insertText();
    /* $(window).on('resize',function(){
         responsiveFixes();
     });*/
});
