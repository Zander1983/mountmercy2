require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {

    var router = new Router();

    $("body").on("click", ".back-button", function (event) {
        event.preventDefault();
        window.history.back();
    });
    
    var body = $('body');
    
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
    
    /*
    console.log('before mouseup and down events');
    
    body.on('mousedown', 'a', function(event) {
        console.log('adding a cloass...');
        $(this).parent('li').addClass('tappable-active');
    });
    
    
    body.on('touchstart', 'a', function(event) {
        console.log('in touchstart and adding a cloass...');
        $(this).parent('li').addClass('tappable-active');
    });
    
    body.on('touchend', 'a', function(event) {
        console.log('in touchstart and adding a cloass...');
        $(this).parent('li').addClass('tappable-active');
    });
    
    body.on('mouseup', 'a', function(event) {
        console.log('removing class...');
        $(this).parent('li').removeClass('tappable-active');
    });
    */
   
    body.on('click', '.list a', function(event) {
        $(this).parent('li').addClass('tappable-active');
    });
    
    body.on('click', '.side-nav__list__item a', function(event) {
        $(this).parent('li').addClass('side-nav-active');
    });
    
   /*
    body.on("click", ".nav-links", function (e) {
            alert('in nav links');
           // var cl = document.body.classList;
            body.removeClass('left-nav');
           // $('.side-nav').hide();
    });*/

    Backbone.history.start();
    


});