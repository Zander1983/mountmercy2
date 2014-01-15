define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ExtraCurricularItem.html'),
        side_nav                = require('text!tpl/SideNav.html'),
        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function (options) {
            this.render();
        },

        render: function (options) {
            var type;
            switch(this.options.type)
            {
            case 'basketball':
                type = require('text!tpl/Basketball.html');
              break;
              
            case 'camogie':
                type = require('text!tpl/Camogie.html');
              break;
              
            case 'camogie':
                type = require('text!tpl/Camogie.html');
              break;

            case 'debating':
                type = require('text!tpl/Debating.html');
              break;
              
            case 'debating':
                type = require('text!tpl/Debating.html');
              break;

            case 'ecdl':
                type = require('text!tpl/ECDL.html');
              break;
              
            case 'ecdl':
                type = require('text!tpl/ECDL.html');
              break;
              
            case 'football':
                type = require('text!tpl/Football.html');
              break;
              
            case 'football':
                type = require('text!tpl/Football.html');
              break;
              
            case 'gaisce':
                type = require('text!tpl/Gaisce.html');
              break;
              
            case 'diograis':
                type = require('text!tpl/Diograis.html');
              break;
        
            case 'green-school':
                type = require('text!tpl/GreenSchool.html');
              break;
              
            case 'hockey':
                type = require('text!tpl/Hockey.html');
              break;
              
            case 'music':
                type = require('text!tpl/Music.html');
              break;
              
            case 'young-scientist':
                type = require('text!tpl/YoungScientist.html');
              break;
              
            case 'ysi':
                type = require('text!tpl/YSI.html');
              break;
              
            default:
             
            }
            this.$el.html(template({side_nav:side_nav, type:type}));

        },


    });

});