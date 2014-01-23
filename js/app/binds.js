/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define(function() {

    var doBinds = function(n) {

            var body = $('body');
   
            body.on("click", ".back-button", function (event) {
                event.preventDefault();
                window.history.back();
            });
            

            body.on("click", "#slide-menu-button", function (e) {

                if (body.hasClass('left-nav')) {

                    body.removeClass('left-nav');
                    /*$('.side-nav').hide();*/
                } else {
                    //$('.side-nav').show();
                    body.addClass('left-nav');           
                }
            });

            body.on("click", ".main-content", function (e) {

                body.removeClass('left-nav');
              /*  $('.side-nav').hide();*/

            });



            body.on('click', '.list a', function(event) {
                $(this).parent('li').addClass('tappable-active');
            });

            body.on('click', '.side-nav__list__item a', function(event) {
                $(this).parent('li').addClass('side-nav-active');
            });

    };
    
    return {
      doBinds: doBinds
    };
    
});