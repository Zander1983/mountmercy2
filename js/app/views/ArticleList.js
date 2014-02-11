define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        Moment              = require('moment'),
        tpl                 = require('text!tpl/ArticleList.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        side_template = _.template(side_nav),
        template = _.template(tpl), 
        is_messages;

    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            if(this.collection.length>0){
                is_messages =  true;
            }
            else{
                is_messages = false;
            }
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count}), 
                                    article:this.collection.toJSON(), 
                                    is_messages:is_messages
                                    }));
            return this;
        },
          


    });

});