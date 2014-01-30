define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        models              = require('app/models/article_view'),
        Useful              = require('app/utils/useful_func'),
        tpl                 = require('text!tpl/Article.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        side_template       = _.template(side_nav),
        template            = _.template(tpl),
        that;

    return Backbone.View.extend({

        initialize: function (options) {

            that = this;
            this.render();
            //save that user has seen it
            //this.saveView(options);
        },
                
        saveView: function(){
   
            var viewDetails = [];
            
            this.storage = window.localStorage;

            this.device_id = this.storage.getItem(project_title+'_device_id');
            this.api_key = this.storage.getItem(project_title+'_api_key');

            viewDetails.device_id = this.device_id;
            viewDetails.article_id = this.model.id;
            viewDetails.project_title = project_title;
            
            var article_view = new models.ArticleView();

            return article_view.save(viewDetails, 
                            {
                            api:true,
                            headers: {device_id:this.device_id,
                            api_key:this.api_key},
                            success: function(data) {
                                    //console.log('successully recorded the view');
                                    Useful.updateCountEl(data.get('count'));
                               
                                },
                                error:   function(model, xhr, options){
                                    //console.log('could not record the view');
                                   //alert('Error setting to 1')
                                   //console.log(xhr.responseText);
                                },
                            });
    
        },    
        

        render: function (options) {
            
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count}), 
                                    title:this.model.get('title'),
                                    content: this.model.get('content')
                                    }));
            return this;
        },
        

    });

});