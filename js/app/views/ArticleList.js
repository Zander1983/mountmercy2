define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Moment              = require('moment'),
        tpl                 = require('text!tpl/ArticleList.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        side_template = _.template(side_nav),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection.on("reset", this.render, this);
        },

        render: function () {

            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count}), article:this.collection.toJSON()}));
            return this;
        },
          


    });

});