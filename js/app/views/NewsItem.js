define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/NewsItem.html'),
        UsefulFuncs         = require('app/utils/useful_func'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.removeDescriptionStyles();
            this.render();
           
        },
        
        events: {
            "click #slide-menu-button"   : "slideMenu",
        },

        render: function () {
            this.$el.html(template({side_nav:side_nav, model:this.model.attributes}));
            return this;
        },
        
        removeDescriptionStyles: function(){
      
            var description = UsefulFuncs.removeStyles(this.model.attributes.description);
            
            if(description.length>0){
                this.model.set({description: description});
            }     
        },

    });

});