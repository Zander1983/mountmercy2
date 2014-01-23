define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
      
    
        Notification = Backbone.Model.extend({  

            urlRoot: "/notification",   

        });



    return {
        Notification: Notification
    };

});