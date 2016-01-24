function sections(){
    //Header section stuff
    $("#header-brand").css("margin-top",parseFloat($("#header-brand").parent().css("max-height"))*0.32);
    $(".inherit-max-immediate").css("height",parseFloat($(".inherit-max-immediate").parent().css("height")));
}
function responsiveFixes(){
    sections();
}
//onload stuff
$(document).ready(function(){
    responsiveFixes();
    $(window).on('resize',function(){
        responsiveFixes();
    });
});
