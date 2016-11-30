$(document).ready(function(){

    $('#action-panel').on('click', '#learn-more', loadSlideshow)
    
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

    var slick = $('#action-panel .slides').slick({
        nextArrow: '.slide-next',
        prevArrow: '.slide-prev',
        dots: true,
        appendDots: '.slides-pagination',
        infinite: false,
        swipe: true,
    });


    $('#action-panel .slides').on('beforeChange', function(e, slick, current, next){
        $('#progress-bar-status').css('max-width', ((next + 1) * progressWidth) + '%');
        var date = new Date();
        var gifSrc = $('#slide-gif-' + (next+1)).attr('src') + '?x' + date.getTime();
        // $('#slide-gif-' + (next+1)).css('opacity', '0');
        // $('#slide-gif-' + (next+1)).attr('src', gifSrc).css('opacity', 1);
    });

    $('#action-panel .slides').on('afterChange', function(e, slick, index){
        var date = new Date();

        var width   = $('#slide-gif-' + (index+1)).width(),
            height  = $('#slide-gif-' + (index+1)).height(),
            top     = $('#slide-gif-' + (index+1)).offset().top,
            left    = $('#slide-gif-' + (index+1)).offset().left;

        $('.image-fixed').removeClass('fade visible');
        $('.image-fixed').css({
            position: 'fixed',
            width: width + 'px',
            height: height + 'px',
            top: top + 'px',
            left: left + 'px'
        }).empty().append('<img src="' + $('#slide-gif-' + (index+1)).attr('src') + '?x' + date.getTime() +'" />');

        $('.image-fixed').addClass('visible');
    });

    function adjustSize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var width   = $('#slide-gif-' + (index+1)).width(),
                height  = $('#slide-gif-' + (index+1)).height(),
                top     = $('#slide-gif-' + (index+1)).offset().top,
                left    = $('#slide-gif-' + (index+1)).offset().left;

            $('.image-fixed').removeClass('fade visible');
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
        var slick = $('#action-panel .slides').slick({
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