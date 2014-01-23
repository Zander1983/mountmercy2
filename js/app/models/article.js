define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
      
    
        Article = Backbone.Model.extend({  

            urlRoot: "/article",   

        });



    return {
        Article: Article
    };

});