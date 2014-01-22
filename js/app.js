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

require(['jquery', 'backbone', 'app/router', 'app/binds', 'app/device'], function ($, Backbone, Router, Binds, Device) {

    var router = new Router();
    Binds.doBinds();

    Backbone.history.start();
    
    alert('going to getSaveId');
    Device.getSaveId();
});


