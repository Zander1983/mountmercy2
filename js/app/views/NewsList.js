define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/NewsList.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.html(template({side_nav:side_nav, news:this.collection.toJSON()}));
            return this;
        },
 

    });

});