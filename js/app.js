console.log('in the fucking require.config ');

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

require(['jquery', 'backbone', 'app/router', 'app/binds'], function ($, Backbone, Router, Binds) {

    console.log('in app.js ***********');

    var router = new Router();
    Binds.doBinds();

    Backbone.history.start();
    
    //Device.checkDeviceDetails();
});


