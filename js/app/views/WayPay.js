define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/WayPay.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        template            = _.template(tpl);

    return Backbone.View.extend({

        initialize: function (options) {

            this.render();
        },

        render: function (options) {
         
            this.$el.html(template({side_nav:side_nav}));
            return this;
        },
                
        events: {
             //"click input": "formationClicked",
             "click #pay-link"   : "linkClicked",
        },
 
 
        
        linkClicked:function (e) {    
            e.preventDefault();
            var url = $(e.currentTarget).attr("rel"); 
            this.loadURL(url);
        },
                
        loadURL: function (url){
                navigator.app.loadUrl(url, { openExternal:true });
                return false; 
        }
        

    });

});