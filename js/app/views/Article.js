define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Article.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        template            = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (options) {
            console.log('in the Article vuiew and messageTitle is ');
            console.log(app.getArticleTitle());
            this.render();
        },

        render: function (options) {
            
            this.$el.html(template({side_nav:side_nav, test:this.options.test}));
            return this;
        },
        

    });

});