
if ( $(window).width() > 700 ) {
    $('nav a').on('click', function() {

        var scrollAnchor = $(this).attr('data-scroll'),
            scrollPoint = $('section[data-anchor="' + scrollAnchor + '"]').offset().top - 28;
    
        $('body,html').animate({
            scrollTop: scrollPoint
        }, 500);
    
        return false;
    
    })

    $(window).scroll(function() {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 400) {
            $('nav').addClass('sticky');

            $('section[data-anchor]').each(function(i) {
                if ($(this).position().top <= windscroll + 80) {
                    $('nav a.header__nav__link--active').removeClass('header__nav__link--active');
                    $('nav a').eq(i).addClass('header__nav__link--active');
                }
            });

        } else {
            $('nav').removeClass('sticky');
            $('nav a.header__nav__link--active').removeClass('header__nav__link--active');
        }

    }).scroll();
}


$(document).ready(function() {
    $("#nav-burger").click(function(){  
        $("body").toggleClass("active-nav");

        $(this).find('.burger-text').text(function(i, text){
            return text === "Meny" ? "Lukk" : "Meny";
        })
    });

    $(".header__nav__link").click(function(){
        $("body").removeClass("active-nav");
    });
    
});

