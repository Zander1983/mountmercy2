define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/CalendarList.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function (options) {
            this.render();
        },

        render: function (options) {
            
            this.$el.html(template({side_nav:side_nav, calendar:this.collection.toJSON()}));

        },


    });

});