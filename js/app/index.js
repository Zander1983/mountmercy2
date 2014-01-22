/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
            
  
    // Bind Event Listeners

    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
     
    
    /*
     * This function registers the device with the server, and stores the device id and the api key.
     * This should only ever execute once. 
     */
    registerDeviceWithServer: function(reg_id){
            require(["app/models/device"], function (model) {
                    var deviceModel = new model.Device();
                    var deviceDetails = [];

                    deviceDetails.project_title = 'mountmercy';
                    deviceDetails.platform = window.device.platform;

                    deviceModel.save(deviceDetails, 
                        {                                    
                        api: true,
                        headers :{device_id:"63843",
                        api_key:"hv7Vgd4jsbb"},
                        success: function (data) {
                            alert('successfully saved');
                            var device_id = data.id;
                            var api_key = data.get('api_key');
                            window.localStorage.setItem('mountmercy_device_id', device_id);
                            window.localStorage.setItem('mountmercy_api_key', api_key);
                            
                            //now update the Reg Id
                            app.updateRegId(device_id, api_key, reg_id);
                        },
                        error:   function(model, xhr, options){
                            alert('there was an error 2');
                            console.log('***********error is *******************');
                            console.log(xhr);
                        },
                    });
            });
        
    },
    
    
    updateRegId: function(device_id, api_key, reg_id){
        
            if(typeof(device_id)!=='undefined' && device_id!==null){
            
                require(["app/models/device"], function (model) {

                        var deviceModel = new model.Device({id:device_id});
                        var deviceDetails = [];

                        deviceDetails.reg_id = reg_id;

                        deviceModel.save(deviceDetails, 
                            {                                    
                            api: true,
                            headers :{device_id:device_id,
                            api_key:api_key},
                            success: function (data) {
     
                            },
                            error:   function(model, xhr, options){
                                // alert('in Error');
                                //console.log('failed to update, details: ');
                                //console.log(xhr.responseText);
                            },
                        });

                    });
            }
        
    },
    
 
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
 
        var pushNotification = window.plugins.pushNotification;
        if (window.device.platform == 'android' || window.device.platform == 'Android') {
            pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"475226855592","ecb":"app.onNotificationGCM"});                        
        }
        else{
            //so its apple
             pushNotification.register(app.tokenHandler,app.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }

    },


    // result contains any message sent from the plugin call
    successHandler: function(result) {
       //alert('Callback Success! Result = '+result)
    },
    errorHandler:function(error) { 
        //alert('in errorHandler');
        //alert(error);
    },
           
    /*
     * 
     * For iOS
     */        
    tokenHandler:function(status) {

        /*
        var device_id = window.localStorage.getItem('mountmercy_device_id');
        var api_key = window.localStorage.getItem('mountmercy_api_key');
        
        if(typeof(device_id)==='undefined' || device_id===null){
            //we dont have a device id so register it and save to local storage. 
            //should only ever enter here once     
            app.registerDeviceWithServer(status);                      
        }
        else{
            //se we have already registered device on server. Now update reg_id
            app.updateRegId(device_id, api_key, status);

        }*/
        alert('in token handler and platform is ');
        alert(window.device.platform);
        console.log('in tokenHandler and window.device.platform is ');
        console.log(window.device.platform);
       
        this.reg_id = status;
       
    },
    
      
    /*
     * For Android Phones
     */
    onNotificationGCM: function(e) {
                    
        switch( e.event )
        {
        
            case 'registered':
                if ( e.regid.length > 0 )
                {
     
                    var device_id = window.localStorage.getItem('mountmercy_device_id');
                    var api_key = window.localStorage.getItem('mountmercy_api_key');
 
               
                    if(typeof(device_id)==='undefined' || device_id===null){
                        //we dont have a device id so register it and save to local storage. 
                        //should only ever enter here once     
    
                        this.registerDeviceWithServer(e.reg_id);                      
                    }
                    else{
                        //se we have already registered device on server. Now update reg_id
                        
                        this.updateRegId(device_id, api_key, e.reg_id);
                        
                    }
                    
                }
                break;

            case 'message':
         
                window.location.hash = "article/"+e.payload.article_id;
         
                break;

            case 'error':
                //alert('GCM error = '+e.msg);
                break;

            default:
               // alert('An unknown GCM event has occurred');
                break;
        }
    }, 
    
    
    onNotificationAPN: function(event) {
        alert('in onNotificationAPN');
        var pushNotification = window.plugins.pushNotification;
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },

};