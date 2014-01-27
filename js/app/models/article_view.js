define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
      
    
        ArticleView = Backbone.Model.extend({  

            urlRoot: "/article_view",   

        }), 
        
        ArticleViewCount = Backbone.Model.extend({  

            urlRoot: "/article_view_count",   

        }), 
        
        ArticleViewCollection = Backbone.Collection.extend({

            model: ArticleView,
            initialize: function (options) {
                this.project_title = options.project_title;
            },
            url: function(){
                    return "/article_views/"+this.project_title;
                 },

        });


    return {
        ArticleView: ArticleView,
        ArticleViewCount:ArticleViewCount,
        ArticleViewCollection: ArticleViewCollection
    };

});