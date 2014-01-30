define(function (require) {

    "use strict";

    var _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Map.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        side_template = _.template(side_nav),
        template = _.template(tpl),
        that;


    return Backbone.View.extend({

        initialize: function () {
            that = this;
            /*
            console.log('Backbone is ');
            console.log(Backbone);
            console.log('GoogleMap is ');
            console.log(GoogleMap);*/
            
            this.render();
            
        },
                
        initMap: function () {

            require(['async!https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false'], function(){

                    that.myLatlng = new google.maps.LatLng(51.889564, -8.517666);
                    
                    that.myLatlng = new google.maps.LatLng(51.889564, -8.517666);


                    that.mapOptions = {
                       center: that.myLatlng,
                       zoom: 12,
                       mapTypeId: google.maps.MapTypeId.ROADMAP
                   };


                   that.map = new google.maps.Map(that.$el.find('#map-canvas')[0],
                                                 that.mapOptions);

                    that.marker = new google.maps.Marker({
                       position: that.myLatlng,
                       map: that.map,
                       title: 'Christians Brothers College Cork'
                   });

            });
        


        },


        render: function () {
    
            this.$el.html(template({side_nav:side_template({message_count:this.options.message_count})}));

            this.initMap();      
           
        },


    });

});