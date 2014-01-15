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
            
    getMessageContent: function() {
        return this.messageContent;
    },
            
    setMessageContent: function(msg) {
        this.messageContent = msg;
    },
            
    getMessageTitle: function(msg) {
        return this.messageTitle = msg;
    },
            
    setMessageTitle: function() {
        return this.messageTitle;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        
        document.addEventListener('deviceready', this.onDeviceReady, false);
       // document.addEventListener('deviceready', this.registerDevice, false);
    },
     
    /*
    registerDevice: function() {

            var device_id = window.localStorage.getItem('mountmercy_device_id');
            
            if(typeof(device_id)==='undefined' || device_id===null){

                //alert('regisstering....');


                var pushNotification = window.plugins.pushNotification;
                if (window.device.platform == 'android' || window.device.platform == 'Android') {
                    pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"475226855592","ecb":"app.onNotificationGCM"});                        
                }
                else{
                    //so its apple
                     pushNotification.register(app.tokenHandler,app.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
                }
            
            } 
            
    },*/
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
            
    goToMessage: function(){

        // window.location.hash="message";
        console.log('before require');
        require(["app/views/Message"], function (Message) {
            //that.body.removeClass('left-nav');
            console.log('in require');
            var PageSlider  = require('app/utils/pageslider');
            var slider = new PageSlider($('body'));
            slider.slidePage(new Message({test: 'the message'}).$el);    
            console.log('end of require');
         });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*
    }
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
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
    tokenHandler:function(msg) {
        
                    require(["app/models/device"], function (model) {
                        
                            
                            var deviceModel = new model.Device();
                            var deviceDetails = [];

                            deviceDetails.reg_id = e.regid;
                            //deviceDetails.reg_id = 'saaf7afadfhkadfh79dasdkh';
                            deviceDetails.project_title = 'mountmercy';
                            deviceDetails.platform = 'ios';

                      
                            deviceModel.save(deviceDetails, 
                                {                                    
                                api: true,
                                headers :{device_id:"63843",
                                api_key:"hv7Vgd4jsbb"},
                                success: function (data) {
                                    //alert('in the success');
                                    window.localStorage.setItem('mountmercy_device_id', data.id);
                                    window.localStorage.setItem('mountmercy_api_key', data.get('api_key'));
                                },
                                error:   function(model, xhr, options){
                                   //alert('in Error');
                                   console.log('error details are: ');
                                   console.log(xhr.responseText);
                                },
                            });
                            
                    });
    },
    
    
    logObject: function(obj){
        
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
                logObject(obj[key], ind + "  ");
                console.log(ind + "}");
            }
            else
            {
                console.log(ind + key + "=" + obj[key]);
            }
        }
        
    },
            
    /*
     * For Android Phones
     */
    onNotificationGCM: function(e) {
     
        //var news = new model.NewsCollection();

       /* news.fetch({
            full_url: false,
            success: function (collection) {
                that.body.removeClass('left-nav');
                slider.slidePage(new NewsList({collection: collection}).$el);                          
            }
        });*/
                    
        switch( e.event )
        {
        
            case 'registered':
                if ( e.regid.length > 0 )
                {

                    var device_id = window.localStorage.getItem('mountmercy_device_id');
            
                    if(typeof(device_id)==='undefined' || device_id===null){
               
                        //alert('in registered and id is '+e.regid);
                        require(["app/models/device"], function (model) {

                                //alert('in the require');

                                var deviceModel = new model.Device();
                                var deviceDetails = [];

                                deviceDetails.reg_id = e.regid;
                                //deviceDetails.reg_id = 'saaf7afadfhkadfh79dasdkh';
                                deviceDetails.project_title = 'mountmercy';
                                deviceDetails.platform = 'android';

                                //alert('in the save');
                                deviceModel.save(deviceDetails, 
                                    {                                    
                                    api: true,
                                    headers :{device_id:"63843",
                                    api_key:"hv7Vgd4jsbb"},
                                    success: function (data) {
                                       // alert('in the success');
                                        window.localStorage.setItem('mountmercy_device_id', data.id);
                                        window.localStorage.setItem('mountmercy_api_key', data.get('api_key'));
                                    },
                                    error:   function(model, xhr, options){
                                      // alert('in Error');
                                       console.log('error details are: ');
                                       console.log(xhr.responseText);
                                    },
                                });

                        });
                    }
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
                
               // console.log('e is ');
               // console.log(this.logObject(e));
                console.log('setting the title to ');
                console.log(e.title);
                console.log('e.message is ');
                console.log(e.message);
                
                this.setMessageTitle(e.title);
                this.setMessageContent('some content');

               window.location.hash = "message";
         
 
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