define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
      
    
        Article = Backbone.Model.extend({  

            urlRoot: "/article",   

        }), 
        
        ArticleCollection = Backbone.Collection.extend({

            model: Article,
            initialize: function (models, options) {
                //console.log('in collection and game id is ');
                //console.log(options.game_id);
                //this.game_id = options.game_id;
            },
            url: "articles",


        });


    return {
        Article: Article,
        ArticleCollection: ArticleCollection
    };

});