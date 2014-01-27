define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
      
    
        Article = Backbone.Model.extend({  

            urlRoot: "/article",   

        }), 
        
        ArticleCollection = Backbone.Collection.extend({

            model: Article,
            initialize: function (options) {
                this.project_title = options.project_title;
            },
            url: function(){
                    return "/articles/"+this.project_title;
                 },


        });


    return {
        Article: Article,
        ArticleCollection: ArticleCollection
    };

});