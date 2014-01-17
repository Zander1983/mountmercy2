define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
      
    
        Notification = Backbone.Model.extend({  

            urlRoot: "/notification",   

        });



    return {
        Notification: Notification
    };

});