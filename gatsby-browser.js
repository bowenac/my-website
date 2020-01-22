//Used for using jQuery/Scripts
exports.onRouteUpdate = () => {
    const $ = require('jquery');
    $(document).ready(function () {
        // NAV POSITION
        var navPos = $('#masthead').position().top;
        var lastPos = 0;
        $(window).on('scroll', function () {
            var pos = $(window).scrollTop();

            if (pos >= navPos + $('nav').height() && lastPos < pos) {
                $('#masthead').addClass('fixed');
            }
            if (pos < navPos && lastPos > pos) {
                $('#masthead').removeClass('fixed');
            }
            lastPos = pos;
        });

        // SCROLL ANIMATIONS
        $.fn.isInViewport = function () {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();

            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };
        function onScrollInit() {
            $('.waypoint').each(function () {
                var elem = $(this),
                    animationClass = elem.attr('data-animation'),
                    animationDelay = elem.attr('data-delay');

                elem.css({
                    '-webkit-animation-delay': animationDelay,
                    '-moz-animation-delay': animationDelay,
                    'animation-delay': animationDelay
                });
                if (elem.isInViewport()) {
                    elem.addClass('animated').addClass(animationClass);
                } else {
                    elem.removeClass('animated').removeClass(animationClass);
                }
            });
        }
        $(window).on('scroll', function () {
            onScrollInit();
        });
        setTimeout(function () {
            onScrollInit();
        }, 300);

        /* Anchor Scroll */
        $('a[href*=\\#]').click(function (e) {
            e.preventDefault();
            var anchor = $(this).attr('href');
            if ($(anchor).length > 0) {
                $('html, body').animate(
                    {
                        scrollTop: $(anchor).offset().top - 60
                    },
                    400
                );
            }
        });
    })
}