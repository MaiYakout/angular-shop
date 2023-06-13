$(function(){
    console.log("laoding video js script");
    $(this).find('video')[0].pause();
    $('#showVideo').modal({
        show: false
    }).on('hidden.bs.modal', function(){
        console.log("closing modal so will close the video")
        $(this).find('video')[0].pause();
    });
});