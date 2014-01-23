require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl'
    },

    shim: {
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['backbone', 'app/router', 'app/binds'], function (Backbone, Router, Binds) {

    console.log('in app.js ***********');

    var router = new Router();
    
    Binds.doBinds();

    Backbone.history.start();
    
});


