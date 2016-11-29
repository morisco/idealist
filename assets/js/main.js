$(document).ready(function(){

    $('#action-panel').on('click', '#learn-more', loadSlideshow)
    var shareOffset = $('#page-shares').offset(),
        shareFixed = false,
        scrollPos = $(window).scrollTop(),
        resizeTimer;

    if(scrollPos > (shareOffset.top - 16)){
        shareFixed = true;
        $('#page-shares').css('left', shareOffset.left).addClass('fixed');
    }

    $(window).on('scroll', adjustShare);
    $(window).on('resize', adjustSize);

    var slick = $('#action-panel .slides').slick({
        nextArrow: '.slide-next',
        prevArrow: '.slide-prev',
        dots: true,
        appendDots: '.slides-pagination',
        infinite: false,
        swipe: false,
    });

    $('#action-panel .slides').on('afterChange', function(e, slick, index){
        if(index == 0){
            $('body').removeClass('in-show');
            $('#action-panel .slides').slick('slickSetOption','swipe',false);
            $('#action-panel .slides').slick('unslick');
            initSlick()
        }
    });

    function adjustSize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if(shareFixed){
                $('#page-shares').removeClass('fixed').removeAttr('style');
                shareOffset.left = $('#page-shares').offset().left;
                $('#page-shares').css('left', shareOffset.left + 'px').addClass('fixed');    
            }
        }, 250);
    }

    function adjustShare(){
        var scrollPos = $(window).scrollTop();
        console.log($('#page-shares').is(':visible'));
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