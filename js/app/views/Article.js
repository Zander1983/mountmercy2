define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        models              = require('app/models/article_view'),
        tpl                 = require('text!tpl/Article.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        template            = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
            this.render();
            //save that user has seen it
            this.saveView(options);
        },
                
        saveView: function(options){
    
            var viewDetails = [];

            viewDetails.device_id = this.options.device_id;
            viewDetails.article_id = this.model.id;
            
            var article_view = new models.ArticleView();

            article_view.save(viewDetails, 
                            {
                            api:true,
                            headers: {device_id:this.options.device_id,
                            api_key:this.options.api_key},
                            success: function() {
                                    alert('view is updated');
                                    //that.storage.removeItem('mountmercy_device_id');
                                    //that.storage.removeItem('mountmercy_api_key');
                                    //that.deviceModel.unset('id');
                                },
                                error:   function(model, xhr, options){
                                   //alert('Error setting to 1')
                                   //console.log(xhr.responseText);
                                },
                            });
    
        },    

        render: function (options) {
            
            this.$el.html(template({side_nav:side_nav, 
                                    title:this.model.get('title'),
                                    content: this.model.get('content')
                                    }));
            return this;
        },
        

    });

});