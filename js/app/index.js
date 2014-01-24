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
            
    logObject: function(obj)
    {
        var ind = "";
        if (arguments.length > 1)
        {
            ind = arguments[1];
        }

        if (typeof obj == "undefined" || obj == null)
        {
            console.log("<null>");
            return;
        }

        if (typeof obj != "object")
        {
            console.log(obj);
            return;
        }

        for (var key in obj)
        {
            if (typeof obj[key] == "object")
            {
                console.log(ind + key + "={");
                this.logObject(obj[key], ind + "  ");
                console.log(ind + "}");
            }
            else
            {
                console.log(ind + key + "=" + obj[key]);
            }
        }
    },
    
    /*
    testDevice: function(){

        console.log('in testDevice');
        require(["app/models/device"], function (models) {
                
                console.log('in the require device');
                var deviceModel = new models.Device();

                var deviceDetails = [];

                deviceDetails.project_title = 'mountmercy';

                console.log('in saveRegId ');

                //deviceDetails.platform = window.device.platform;
                deviceDetails.platform = 'ios';

                deviceModel.save(deviceDetails, 
                    {                                    
                    api: true,
                    headers :{device_id:"63843",
                    api_key:"hv7Vgd4jsbb"},
                    success: function (data) {
                        //alert('successfully saved');
                        var device_id = data.id;
                        var api_key = data.get('api_key');
                        window.localStorage.setItem('mountmercy_device_id', device_id);
                        window.localStorage.setItem('mountmercy_api_key', api_key);

                        //now update the Reg Id
                        //this.updateRegId(device_id, api_key, '');
                    },
                    error:   function(model, xhr, options){
                        //alert('there was an error 2');
                        console.log('***********error is *******************');
                        console.log(xhr);
                    },
                });

            }); 

    },*/
            
  
  
    // Bind Event Listeners

    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
     
    
    /*
     * This function registers the device with the server, and stores the device id and the api key.
     * This should only ever execute once. 
     */
    registerDeviceWithServer: function(reg_id){
 
            var url = "http://push.schoolspace.ie/device_api/device";
            //var url = "http://localhost/schoolspace/device_api/device";
           
            $.ajax({
                url: url,
                type: "post",
                data: {project_title: 'mountmercy', platform: window.device.platform},
                pure_ajax: true,
                headers :{device_id:"63843",
                api_key:"hv7Vgd4jsbb"},
                success: function(data){
                    //alert("success in registerDeviceWithServer and id is");
                    
                    var obj = jQuery.parseJSON(data);
                
                    var device_id = obj.id;
                    var api_key = obj.api_key;
                    window.localStorage.setItem('mountmercy_device_id', device_id);
                    window.localStorage.setItem('mountmercy_api_key', api_key);

                    //now update the Reg Id
                    app.updateRegId(device_id, api_key, reg_id);
                },
                error:   function(model, xhr, options){
                    //alert('failed in registerDeviceWithServer');
                    // alert('in Error');
                    console.log('response is : ');
                    console.log(app.logObject(xhr));
                },
            });
    },
    
    
    updateRegId: function(device_id, api_key, reg_id){
        
            var url = "http://push.schoolspace.ie/device_api/device/"+device_id;
            
            console.log('in updateRegId');
            console.log('updatig with reg_id of ');
            console.log(reg_id);
            $.ajax({
                url: url,
                type: "put",
                data: {reg_id: reg_id},
                pure_ajax: true,
                headers :{device_id:device_id,
                api_key:api_key},
                success: function(data){
                    //alert("success in updateRegId");
                    
                },
                error:   function(model, xhr, options){
                    //alert('failed in updateRegId');
                    // alert('in Error');
                    console.log('response is : ');
                    console.log(app.logObject(xhr));
                },
            });
            
    },
    
 
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
 
        console.log('in onDeviceReady and platform is ');
        console.log(window.device.platform);
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
        
       
        var device_id = window.localStorage.getItem('mountmercy_device_id');
        var api_key = window.localStorage.getItem('mountmercy_api_key');
        
        if(typeof(device_id)==='undefined' || device_id===null){
            //we dont have a device id so register it and save to local storage. 
            //should only ever enter here once     
            console.log('in the if so going to registerDeviceWithServer ');

            app.registerDeviceWithServer(status);        

        }
        else{
            app.updateRegId(device_id, api_key, status);

        }
       
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
                        console.log('in the if so going to registerDeviceWithServer ');
                  
                        app.registerDeviceWithServer(e.regid);        

                    }
                    else{
                        //so we have already registered device on server. Now update reg_id
                        //console.log('in the else so going to updateRegId and app.reg_id is ');
                        //console.log(app.reg_id);
                        app.updateRegId(device_id, api_key, e.regid);

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
        
        console.log('*******in onNotificationAPN and event is ************');
        console.log(app.logObject(event));
        
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

        if ( event.payload )
        {
            console.log('event.payload is ');
            console.log(event.payload);
            console.log('article id is ');
            console.log(event.payload.article_id);
            window.location.hash = "article/"+e.payload.article_id;
            //localStorage.payload =// event.payload   
        }
    },

};