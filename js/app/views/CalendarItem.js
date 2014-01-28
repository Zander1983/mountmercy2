define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/CalendarItem.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        side_template = _.template(side_nav),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            
            this.render();
           
        },
        
        events: {
            "click #slide-menu-button"   : "slideMenu",
        },

        render: function () {
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count}), model:this.model.attributes}));
            return this;
        },
        


    });

});