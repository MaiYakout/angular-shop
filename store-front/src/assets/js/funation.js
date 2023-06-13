function phone(){
    console.log("phone number")
    $("#phone").intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.0.3/js/utils.js"
      });
      
}
function navbar(){
    $(".nav li").hover(function () {
        $(this).children("ul").stop().delay(200).animate({height: "toggle", opacity: "toggle"}, 200);
      });
}
module.exports = {
    phone : phone,
    navbar : navbar
}