//Home fit screen

/*global $:false */
$(function() {
    "use strict";
    $('#home, #home .container').css({
        'height': ($(window).height()) + 'px'
    });
    $(window).resize(function() {
        $('#home, #home .container').css({
            'height': ($(window).height()) + 'px'
        });
        $.colorbox.resize({width:"100%" , height:"100%"});
    });
});

/**
 * language
 */

$(function() {
    var userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.toLowerCase();
    $(window).hashchange(function() {
        $("ul.menu li.menu-lang, .menu-mobile li.menu-lang").addClass("loading");
        $(".menu-lang a, .menu-mobile li.menu-lang a").removeClass("active");
        if (location.hash == "#fr") {
            getLanguageByID("fr");
            $(".menu-lang .fr, .menu-mobile li.menu-lang a.fr").addClass("active");
        } else if (location.hash == "#en") {
            getLanguageByID("en");
            $(".menu-lang .en, .menu-mobile li.menu-lang a.en").addClass("active");
        } else {
            if (userLang == "fr" || userLang == "fr-be" || userLang == "fr-ca" || userLang == "fr-fr" || userLang == "fr-lu" || userLang == "fr-mc" || userLang == "fr-ch") {
                getLanguageByID("fr");
                $(".menu-lang .fr, .menu-mobile li.menu-lang a.fr").addClass("active");
            } else {
                getLanguageByID("en");
                $(".menu-lang .en, .menu-mobile li.menu-lang a.en").addClass("active");
            }
        }
    })
    $(window).hashchange();
});

var getLanguageByID = function(lang){
    $("[data-localize]").localize(path+"js/lang", {
        language: lang,
        callback: function(data, defaultCallback){
            defaultCallback(data);
            setTimeout(function(){
                $("ul.menu li.menu-lang").removeClass("loading");
                $(".legal-button").attr("href", path+"pdf/legal-terms-"+lang+".pdf")
                $(".menu-mobile li.menu-lang").removeClass("loading");
                $("a.iframe").each(function(){
                    var href = $(this).attr("href").split("#");
                    if (href != ""){
                        $(this).attr("href",href[0]+"#"+lang);
                    }
                });
            },500);
        }
    });
}


// twitter
$('#sep1 .tweet').twittie({
    apiPath    : path+'js/api/tweet.php',
    count      : 10,
    dateFormat : '%b. %d, %Y',
    template   : '<div class="test"><h6>{{tweet}}</h6><p><span>{{screen_name}} - {{date}}</span></p></div>',
    username   : 'bdussaux'
}, function() {
    $('.tweet ul').bxSlider({
        adaptiveHeight : true,
        auto           : true,
        autoStart      : true,
        controls       : true,
        pager          : false,
        pause          : 5000,
        slideMargin    : 1,
        speed          : 1000,
        touchEnabled   : true
    });
});


// touch
//
$(function() {
    if(Modernizr.touch){
        FastClick.attach(document.body);
        $(document).on("touchmove", ".open-menu", function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }
});


// Menu

$(function() {
  var menuDesktop = $('#menu-wrap');
      menu = menuDesktop.find('ul.menu'),
      buttonMobile=menuDesktop.find('#button-mobile-menu');

      buttonMobile.click(function(event) {
        //toggle class body
        $("body").toggleClass('open-menu');

      });

      $(document).on('click', '.close-menu-mobile', function(event) {
        event.preventDefault();
        $("body").toggleClass('open-menu');
      });
      $(document).on('click', '.menu-mobile-wrapper .menu-mobile li a.scroll', function(event) {
        event.preventDefault();
        $("body").toggleClass('open-menu');
      });



});



//Scrolling

$(document).ready(
    function() {
    $("html").niceScroll({
        background : "#000000",
        bouncescroll : true,
        cursorborderradius: 0,
        cursorcolor: "#FFFFFF",
        cursorminheight : 10,
        cursoropacitymax : .8,
        cursoropacitymin : .4,
        cursorwidth : 3

    });

    }
);




/*global $:false */
$(document).ready(function() {
    "use strict";
    $(".scroll").click(function(event) {

        event.preventDefault();

        var full_url      = this.href;
        var parts         = full_url.split("#");
        var trgt          = parts[1];
        var target_offset = $("#" + trgt).offset();
        var target_top    = target_offset.top - 60;

        $('html, body').animate({
            scrollTop: target_top
        }, 1200);
    });
});




//Tooltip

$(document).ready(function() {
    $(".tipped").tipper();
});









//Portfolio filter

/*global $:false */
$(document).ready(function() {
    var $container = $('.portfolio-wrap');
    var $filter = $('#filter');
    // Initialize isotope
    $container.isotope({
        filter: '*',
        layoutMode: 'fitRows',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });
    // Filter items when filter link is clicked
    $filter.find('a').click(function() {
        var selector = $(this).attr('data-filter');
        $filter.find('a').removeClass('current');
        $(this).addClass('current');
        $container.isotope({
            filter: selector,
            animationOptions: {
                animationDuration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });


    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;


        if (winWidth > 1024) {
            columnNumb = 4;
        } else if (winWidth > 900) {
            columnNumb = 2;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else if (winWidth < 479) {
            columnNumb = 1;
        }

        return columnNumb;
    }

    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        $container.find('.portfolio-box').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        $container.isotope('reLayout');
    }

    $container.imagesLoaded(function() {
        setColumns();
    });


    $(window).bind('resize', function() {
        setProjects();
    });
});









//Colorbox single project pop-up

$(document).ready(function() {
    $(".iframe").colorbox({
        iframe: true,
        width: "100%",
        height: "100%",
        rel: 'group1'
    });
});


//Google map


jQuery(document).ready(function() {
if($("#google_map").length){
    var e = new google.maps.LatLng(48.8689218, 2.3496322),
        o = {
            center            : new google.maps.LatLng(48.8689218, 2.3496322),
            draggable         : !0,
            mapTypeControl    : !1,
            mapTypeId         : google.maps.MapTypeId.ROADMAP,
            navigationControl : !1,
            scrollwheel       : !1,
            zoom              : 14
        },
        n = new google.maps.Map(document.getElementById("google_map"), o);
    google.maps.event.addDomListener(window, "resize", function() {
        var e = n.getCenter();
        google.maps.event.trigger(n, "resize"), n.setCenter(e)
    });

    var g = '<div class="map-tooltip"><h6>Benoit Dussaux</h6><p></p></div>',
        a = new google.maps.InfoWindow({
            content: g
        }),
        t = new google.maps.MarkerImage(path+"images/map-pin.png", new google.maps.Size(40, 40),
            new google.maps.Point(0, 0), new google.maps.Point(20, 38),
            new google.maps.Size(40, 40)),
        i = new google.maps.LatLng(48.8689218, 2.3496322),
        p = new google.maps.Marker({
            position: i,
            map: n,
            icon: t,
            zIndex: 3
        });
    google.maps.event.addListener(p, "click", function() {
            a.open(n, p)
        }),
        $(".button-map").click(function() {
            $("#google_map").slideToggle(300, function() {
                    $("#footer .back-top").toggleClass('togglemap');
                    google.maps.event.trigger(n, "resize"), n.setCenter(e)
                }),
                $(this).toggleClass("close-map show-map")
        });
    }

});

//Home effect

$(document).ready(function() {
    if(!Modernizr.touch && $(window).width() > 420){
        $('.home_pattern').particleground({
            dotColor: '#292929',
            lineColor: '#292929'
        });
    }
});





// Switcher CSS
$(document).ready(function() {
    "use strict";
    $("#hide, #show").click(function() {
        if ($("#show").is(":visible")) {

            $("#show").animate({
                "margin-left": "-300px"
            }, 300, function() {
                $(this).hide();
            });

            $("#switch").animate({
                "margin-left": "0px"
            }, 300).show();
        } else {
            $("#switch").animate({
                "margin-left": "-300px"
            }, 300, function() {
                $(this).hide();
            });
            $("#show").show().animate({
                "margin-left": "0"
            }, 300);
        }
    });

});
