define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
      
    
        Device = Backbone.Model.extend({  

            urlRoot: "/device",   

        });



    return {
        Device: Device
    };

});