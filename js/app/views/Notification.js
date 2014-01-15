define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Notification.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        template            = _.template(tpl),
        that,
        storage,
        notification;

    return Backbone.View.extend({

        initialize: function (options) {
            that = this;
            
            this.storage = window.localStorage;
            this.notification = this.storage.getItem('notification');
            
            this.render();
        },

        render: function (options) {
         
            this.$el.html(template({side_nav:side_nav, notification:this.notification
                                    }));
            return this;
        },
        
                
        events: {
             //"click input": "notificationClicked",
             "change #notification"   : "switchClicked",
        },
 
                
        switchClicked:function (event) {    

            event.preventDefault();    
            
            var checked = $(event.currentTarget).is(":checked");
            
            if(checked===true){
                if(that.notification!=="yes"){
                    that.storage.setItem('notification', 'yes');
                }
            }
            else{
                if(that.notification!=="no"){
                    that.storage.setItem('notification', 'no');
                }         
            }
         
        },

    });

});