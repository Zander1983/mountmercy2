define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
      
    
        Article = Backbone.Model.extend({  

            urlRoot: "/article",   

        });



    return {
        Article: Article
    };

});