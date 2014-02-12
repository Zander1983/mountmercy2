define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/AlbumList.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        side_template       = _.template(side_nav),
        template            = _.template(tpl);


    return Backbone.View.extend({

        initialize: function (options) {
            this.render();
        },

        render: function (options) {
            
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count}), album:this.collection.toJSON()}));

        },


    });

});