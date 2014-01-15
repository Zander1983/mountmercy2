define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Contact.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {           
            this.render();          
        },
    


        render: function () {
    
            this.$el.html(template({side_nav:side_nav}));

        },


    });

});