$(document).ready(function(){

    var shareOffset = $('#page-shares').offset(),
        shareFixed = false,
        scrollPos = $(window).scrollTop(),
        resizeTimer,
        progressWidth = 100 / $('#action-panel .slide').length;

    $('#progress-bar-status').css('max-width', progressWidth + '%');

    if(scrollPos > (shareOffset.top - 16)){
        shareFixed = true;
        $('#page-shares').css('left', shareOffset.left).addClass('fixed');
    }

    $('.slide-text').balanceText();

    $(window).on('scroll', adjustShare);
    $(window).on('resize', adjustSize);

    $('#action-panel .slides').on('init', function(e, slick, current, next){
        var width   = $('#slide-gif-1').width(),
            height  = $('#slide-gif-1').height(),
            top     = $('#slide-gif-1').offset().top,
            left    = $('#slide-gif-1').offset().left;

        $('.image-fixed').removeClass('fade');
        $('.image-fixed').css({
            position: 'fixed',
            width: width + 'px',
            height: height + 'px',
            top: top + 'px',
            left: left + 'px'
        }).empty().append('<img src="' + $('#slide-gif-1').attr('src') + '" />')

        $('.image-fixed').addClass('visible');
    });

    var $slick = $('#action-panel .slides');

    var slick = $slick.slick({
        nextArrow: '.slide-next',
        prevArrow: '.slide-prev',
        dots: true,
        appendDots: '.slides-pagination',
        infinite: false,
        swipe: true,
        arrows: true
    });

    $(document).on('keydown', function(e) {
         if(e.keyCode == 37) {
             $slick.slick('slickPrev');
         }
         if(e.keyCode == 39) {
             $slick.slick('slickNext');
         }
     });

    $('#header-join').on('click', function(){
        $('.image-fixed').removeClass('fade visible');
        $slick.slick('slickGoTo', 20);
    });

    $slick.on('beforeChange', function(e, slick, current, next){
        $('#progress-bar-status').css('max-width', ((next + 1) * progressWidth) + '%');
        var date = new Date();
        var gifSrc = $('#slide-gif-' + (next+1)).attr('src') + '?x' + date.getTime();
        // $('#slide-gif-' + (next+1)).css('opacity', '0');
        // $('#slide-gif-' + (next+1)).attr('src', gifSrc).css('opacity', 1);
        if(next === 9 || next === 11 || next === 21){
            $('.image-fixed').removeClass('fade visible');
        }
    });

    $slick.on('afterChange', function(e, slick, index){
        var date = new Date();
        var image   = $('#action-panel .slide.slick-active').data('image');

        if(!image){
            $('.image-fixed').removeClass('fade visible');
            return;
        }

        var width   = $('#' + image).width(),
            height  = $('#' + image).height(),
            top     = $('#' + image).offset().top,
            left    = $('#' + image).offset().left;

        $('.image-fixed').removeClass('fade visible');
        $('.image-fixed').css({
            position: 'fixed',
            width: width + 'px',
            height: height + 'px',
            top: top + 'px',
            left: left + 'px'
        }).empty().append('<img src="' + $('#' + image).attr('src') + '?x' + date.getTime() +'" />');

        $('.image-fixed').addClass('visible');
    });

    function adjustSize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var image   = $('#action-panel .slide.slick-active').data('image');
            var width   = $('#' + image).width(),
                height  = $('#' + image).height(),
                top     = $('#' + image).offset().top,
                left    = $('#' + image).offset().left;

            $('.image-fixed').css({
                position: 'fixed',
                width: width + 'px',
                height: height + 'px',
                top: top + 'px',
                left: left + 'px'
            })
        }, 250);
    }

    function adjustShare(){
        var scrollPos = $(window).scrollTop();
        if(!$('#page-shares').is(':visible'))
            return;

        if(scrollPos <= (shareOffset.top - 16)){
            shareFixed = false;
            $('#page-shares').removeClass('fixed').removeAttr('style');
        } else {
            shareFixed = true;
            $('#page-shares').css('left', shareOffset.left).addClass('fixed');
        }
    }

    function initSlick(){
        var $slick = $('#action-panel .slides');
        var slick = $slick.slick({
            nextArrow: '.slide-next',
            prevArrow: '.slide-prev',
            dots: true,
            appendDots: '.slides-pagination',
            infinite: false,
            swipe: false,
        });
    }

    function loadSlideshow(){
        var slideScrollPos = $('#action-panel').offset().top;
        $('body,html').animate({scrollTop: slideScrollPos});
        $('body').addClass('in-show');
        $('#action-panel .slides').slick('slickGoTo',1);
        $('#action-panel .slides').slick('slickSetOption','swipe',true);
    }

});