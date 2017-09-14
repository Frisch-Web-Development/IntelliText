var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (550-(scrolled)) + 'px');
}

$(window).scroll(function(e){
    parallax();
});