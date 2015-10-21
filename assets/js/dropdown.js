/*
Dropdown plugin
Usage: $("#navbarMenu").dropdown();
*/
(function( $ ){
    $.fn.dropdown = function(options) {

        //DEFAULT VALUES
        var defaults = {
        };

        //PLUGIN SETTINGS
        var settings = $.extend( {}, defaults, options );

        return this.each(function() {
            //uncomment here to show plus icon
            //$(this).find("ul .submenu > a").append('<span class="submenu-button"></span>');

            //OPEN TOGGLE MENU ON BREAKPOINT MEDIA QUERY
            $(".toggleMenu").click(function(e){
                $("nav .container > ul, nav > ul").slideToggle();
                e.preventDefault();
            });

            //TO PREVENT MENU CLOSE ON CLICK IN SUBMENU
            $(".submenu ul li").click(function(e){
                e.stopPropagation();
            });


            //CLICK ON SUBMENU LINK
            $(".submenu").click(function(e){
                e.preventDefault();
                //CLOSE OPEN SUBMENU
                if($(this).hasClass("active")){
                    $(".navbar").find("ul li").removeClass('active');
                    $(".navbar").find("ul li ul").slideUp();
                }else{
                    $(".navbar").find("ul li").removeClass('active');
                    $(".navbar").find("ul li ul").slideUp();
                    $(this).addClass("active");
                    $(this).find('ul').stop().slideToggle();
                    e.stopPropagation();
                }
                $(".navbar").find("ul li").removeClass('openSub');
                $(this).addClass('openSub');
            });

            $("body, html").click(function(){
                $(this).find("ul li").removeClass('active openSub');
                $(this).find("ul li ul").stop().slideUp();
            });
        });
    };
})( jQuery );