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

            viewDetails.device_id = this.options.device_id;
            viewDetails.article_id = this.model.id;
            viewDetails.project_title = project_title;
            
            var article_view = new models.ArticleView();

            console.log('before article_view.save');
            return article_view.save(viewDetails, 
                            {
                            api:true,
                            headers: {device_id:this.options.device_id,
                            api_key:this.options.api_key},
                            success: function(data) {

                                    Useful.updateCountEl(data.get('count'));
                                   // return data;
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
        
        setMessageCount: function(new_count){
            console.log('in setMessageCount and new_count is ');
            console.log(new_count);
            this.message_count = new_count;
            
        },
                
        getMessageCount: function(){
    
            console.log('in getMessageCount and message_count is ');
            console.log(this.message_count);
    
            return this.message_count;
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