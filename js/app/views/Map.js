define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Map.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl),
        map, myLatlng, mapOptions, marker, test;


    return Backbone.View.extend({

        initialize: function () {
            
            this.render();
            
        },
                
        initMap: function () {
            
             this.myLatlng = new google.maps.LatLng(51.889564, -8.517666);
    
             this.mapOptions = {
                center: this.myLatlng,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
           
              
            this.map = new google.maps.Map(this.$el.find('#map-canvas')[0],
                                          this.mapOptions);
           
             this.marker = new google.maps.Marker({
                position: this.myLatlng,
                map: this.map,
                title: 'Christians Brothers College Cork'
            });

        },


        render: function () {
    
            this.$el.html(template({side_nav:side_nav}));

            this.initMap();      
           
        },


    });

});