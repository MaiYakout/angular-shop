

function chat(){
    hideChat(0);

$('#prime').click(function() {
  toggleFab();
});


//Toggle chat and links
function toggleFab() {
  $('.prime').toggleClass('zmdi-comment-outline');
  $('.prime').toggleClass('zmdi-close');
  $('.prime').toggleClass('is-active');
  $('.prime').toggleClass('is-visible');
  $('#prime').toggleClass('is-float');
  $('.chat').toggleClass('is-visible');
  $('.fab').toggleClass('is-visible');
  
}

  $('#chat_first_screen').click(function(e) {
        hideChat(1);
  });

  $('#chat_second_screen').click(function(e) {
        hideChat(2);
  });

  $('#chat_third_screen').click(function(e) {
        hideChat(3);
  });

  $('#chat_fourth_screen').click(function(e) {
        hideChat(4);
  });

  $('#chat_fullscreen_loader').click(function(e) {
      $('.fullscreen').toggleClass('zmdi-window-maximize');
      $('.fullscreen').toggleClass('zmdi-window-restore');
      $('.chat').toggleClass('chat_fullscreen');
      $('.fab').toggleClass('is-hide');
      $('.header_img').toggleClass('change_img');
      $('.img_container').toggleClass('change_img');
      $('.chat_header').toggleClass('chat_header2');
      $('.fab_field').toggleClass('fab_field2');
      $('.chat_converse').toggleClass('chat_converse2');
      //$('#chat_converse').css('display', 'none');
     // $('#chat_body').css('display', 'none');
     // $('#chat_form').css('display', 'none');
     // $('.chat_login').css('display', 'none');
     // $('#chat_fullscreen').css('display', 'block');
  });

function hideChat(hide) {
    switch (hide) {
      case 0:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'block');
            $('.chat_fullscreen_loader').css('display', 'none');
             $('#chat_fullscreen').css('display', 'none');
            break;
      case 1:
            $('#chat_converse').css('display', 'block');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
      case 2:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'block');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
      case 3:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'block');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            break;
      case 4:
            $('#chat_converse').css('display', 'none');
            $('#chat_body').css('display', 'none');
            $('#chat_form').css('display', 'none');
            $('.chat_login').css('display', 'none');
            $('.chat_fullscreen_loader').css('display', 'block');
            $('#chat_fullscreen').css('display', 'block');
            break;
    }
}
}
function slider(){
      $(document).ready(function(){
            $('.carousel').slick({
            slidesToShow: 3,
            dots:true,
            centerMode: true,
            });
          });
          
          // Slick version 1.5.8
}
function tabs(){
      
    // hide all contents accept from the first div
    $('.tabContent .div:not(:first)').toggle();

    // hide the previous button
    $('.previous').hide();
    $('.next1').hide();

    $('.tabs li').click(function () {

        if ($(this).is(':last-child')) {
            $('.next').hide();
            $('.next1').show();
        } else {
            $('.next').show();
            $('.next1').hide();
        }

        if ($(this).is(':first-child')) {
            $('.previous').hide();
            $('.previous1').show();
        } else {
            $('.previous').show();
            $('.previous1').hide();
        }

        var position = $(this).position();
        var corresponding = $(this).data("id");

        // scroll to clicked tab with a little gap left to show previous tabs
        scroll = $('.tabs').scrollLeft();
        $('.tabs').animate({
            'scrollLeft': scroll + position.left - 30
        }, 200);

        // hide all content divs
        $('.tabContent .div').hide();

        // show content of corresponding tab
        $('.div.' + corresponding).toggle();

        // remove active class from currently not active tabs
        $('.tabs li').removeClass('active');

        // add active class to clicked tab
        $(this).addClass('active');
    });

$('.div a').click(function(e){
    e.preventDefault();
    $('li.active').next('li').trigger('click');
});
$('.next').click(function(e){
    e.preventDefault();
    $('li.active').next('li').trigger('click');
});
$('.previous').click(function(e){
    e.preventDefault();
    $('li.active').prev('li').trigger('click');
});
}
function down(){
      $('.transform').toggleClass('transform-active');
      $('.transform-arrow').toggleClass('transform-arrow-active');
}
function phone(){
    $("#phone").intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js"
      });
}
module.exports = {
    chat : chat,
    slider :slider,
    tabs : tabs,
    down :down,
    phone : phone
}