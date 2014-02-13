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
            "click #inner-container a"   : 'linkClicked'
        },
        
        
        linkClicked: function(e){
    
            e.preventDefault();
    
            var href = $(e.currentTarget).attr('href');
            
            if (window.device.platform == 'android' || window.device.platform == 'Android') {
                //Android ONLY - ios can you inAppBrowser
                navigator.app.loadUrl(href, { openExternal:true });
            
            }
            else{
                window.open(href, '_blank');
            }
            
        },

        render: function () {
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count}), model:this.model.attributes}));
            return this;
        },
        


    });

});