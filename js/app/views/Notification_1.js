define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        device_model        = require('app/models/device'),
        tpl                 = require('text!tpl/Notification.html'),
        side_nav            = require('text!tpl/SideNav.html'),
        template            = _.template(tpl),
        that,
        notification;

    return Backbone.View.extend({

        initialize: function (options) {
            
            this.storage = options.storage;
            this.deviceModel = this.model;
            
            that = this;
            
            this.render();
        },

        render: function (options) {
         
            if(this.model.has('project_title')){
                notification = "yes";
            }
            else{

                this.model.unset('id');
                notification = "no";
            }
         
            this.$el.html(template({side_nav:side_nav, notification:notification
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

                    //that.storage.setItem('notification', 'yes');
                    
                    //var device = new device_model.Device();
           
                    /*
                     * for the phone
                     */
                    
                    
                    var pushNotification = window.plugins.pushNotification;
                    if (window.device.platform == 'android' || window.device.platform == 'Android') {
                        pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"950507125139","ecb":"app.onNotificationGCM"});                        
                    }
                    else{
                        //so its apple
                         pushNotification.register(app.tokenHandler,app.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
                    }
                    
               
                    /*
                     * for testing on chrome
                     */
                    
                    /*
                    require(["app/models/device"], function (model) {
                        
                            alert('in the require');
                            
                            var deviceModel = new model.Device();
                            var deviceDetails = [];

                            //deviceDetails.reg_id = e.regid;
                            deviceDetails.reg_id = 'saaf7afadfhkadfh79dasdkh';
                            deviceDetails.project_title = 'cbccork';
                            //deviceDetails.platform = window.device.platform;
                            deviceDetails.platform = "andrid";

                            alert('in the save');
                            deviceModel.save(deviceDetails, 
                                {                                    
                                api: true,
                                headers :{device_id:"63843",
                                api_key:"hv7Vgd4jsbb"},
                                success: function (data) {
                                    alert('in the success');
                                    window.localStorage.setItem('cbccork_device_id', data.id);
                                    window.localStorage.setItem('cbccork_api_key', data.get('api_key'));
                                },
                                error:   function(model, xhr, options){
                                   alert('in Error');
                                   console.log('error details are: ');
                                   console.log(xhr.responseText);
                                   console.log('xhr is ');
                                   console.log(xhr);
                                },
                            });
                            
                    });*/

            }
            else{
                //if(that.notification!=="no"){
                    //console.log('saving no..');
                    //that.storage.setItem('notification', 'no');
                    
                    var device_id = that.storage.getItem('cbccork_device_id');
                    if(typeof(device_id)==='undefined' || device_id===null){
                        //theres a problem, this should be set
                        alert('There was a problem turning off notifications, please contact the developer');
                    }
                    else{
                        //var device = new device_model.Device({id:device_id});
                        that.deviceModel.id = device_id;
                        that.deviceModel.destroy({
                                        api:true,
                                        headers: {device_id:that.storage.getItem("cbccork_device_id"),
                                        api_key:that.storage.getItem("cbccork_api_key")},
                                        success: function() {
                                                alert('its gone');
                                                that.storage.removeItem('cbccork_device_id');
                                                that.storage.removeItem('cbccork_api_key');
                                                that.deviceModel.unset('id');
                                            },
                                        error: function(){
                                            alert('there was an error destroying');
                                        }
                                        });
                    }
                
            }
         
        },

    });

});