define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/PhotoItem.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        side_template = _.template(side_nav),
        template = _.template(tpl),
        album_title;

    return Backbone.View.extend({

        initialize: function () {
            
            //var index = this.collection.indexOf(this.model);
            //var before = this.collection.at(index-1);
            //var after = this.collection.at(index+1);
            
            this.render();     
        },

        render: function () {
            album_title = this.model.attributes.album_title;
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count}), model:this.model.attributes, album_title:album_title}));
            //this.$el.html(template({side_nav:side_nav, model:this.model.attributes, before:before, after:after}));
            return this;
        },

    });

});