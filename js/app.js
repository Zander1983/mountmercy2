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

    var router = new Router();
    Binds.doBinds();

    Backbone.history.start();
    
});


