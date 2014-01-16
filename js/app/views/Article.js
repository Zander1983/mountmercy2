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
            this.render();
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