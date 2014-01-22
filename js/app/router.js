define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
    
        slider = new PageSlider($('body')),
        news,
        calendar,
        deviceModel,
        that;

    return Backbone.Router.extend({

        routes: {
            "": "getAboutUs",
            "news": "getNews",
            "news-item/:id": "getNewsItem",
            "extracurricular": "getExtraCurricular",           
            "extracurricular-item/:type": "getExtraCurricularItem",
            "calendar": "getCalendar",
            "calendar-item/:id": "getCalendarItem",
            "map": "getMap",
            "contact": "getContact",
            "about-us": "getAboutUs",
            "notification": "getNotification",
            "waypay": "getWayPay",
            "article/:id": "getArticle",
        },
        
        initialize: function() {   
            that = this;
            that.body = $('body');
            
            console.log('in initialize and body is ');
            console.log(that.body);
            
            this.bind( "route", this.routeChange);


            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {         
                alert('in ajax prefilter');
                console.log('in ajaxPrefilter');

                if(options.api==true){
                    //172.16.22.68
                    //options.url = "http://localhost/schoolspace/device_api" + options.url;
                    
                    if(options.update_notification==true){
                       options.url = "http://push.schoolspace.ie/device_api/update_notification" + options.url+"";                        
                    }
                    else{
                        options.url = "http://push.schoolspace.ie/device_api" + options.url;                        
                    }
                    
                    console.log('in api true and options.url is ');
                    console.log(options.url);
                    
                }
                else{
                    if(options.full_url==true){
   
                    }
                    else{
                        //this is when testing in a browser
                        //options.url = "http://localhost/schoolspace/cli/mountmercy2/www/scripts" + options.url
                        options.url = "http://localhost/schoolspace/cli/mountmercy2/www/scripts" + options.url
                    }
                }
  
   
           });

        },
                
        routeChange: function(){
    
            $('html,body').scrollTop(0);
    
        },
                      

        getNews: function (id) {
 
            require(["app/models/news", "app/views/NewsList"], function (model, NewsList) {
       
                if(typeof(news)==='undefined' || news===null){
                    news = new model.NewsCollection();
                    
                    news.fetch({
                        full_url: true,
                        success: function (collection) {
                            console.log('in getNews and body is ');
                            console.log(that.body);
                            that.body.removeClass('left-nav');
                            slider.slidePage(new NewsList({collection: collection}).$el);                          
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new NewsList({collection: news}).$el);
                }
                            
            });
        },
        
        
        getCalendar: function (id) {

            require(["app/models/calendar", "app/views/CalendarList"], function (model, CalendarList) {
       
                if(typeof(calendar)==='undefined' || calendar===null){
                    calendar = new model.CalendarCollection();
                    
                    calendar.fetch({
                        full_url: true,
                        success: function (collection) {
                            console.log('body is ');
                            console.log(that.body);
                            that.body.removeClass('left-nav');
                            slider.slidePage(new CalendarList({collection: collection}).$el);                          
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new CalendarList({collection: calendar}).$el);
                }
                            
            });
        },
        
        getNewsItem: function (id) {
            
            require(["app/views/NewsItem"], function (NewsItem) {
                that.body.removeClass('left-nav');
                 slider.slidePage(new NewsItem({model: news.get(id)}).$el);
                                 
            });
        },
                
        getCalendarItem: function (id) {
            console.log('top of getCalendarItem');
            require(["app/views/CalendarItem"], function (CalendarItem) {
                that.body.removeClass('left-nav');
                 slider.slidePage(new CalendarItem({model: calendar.get(id)}).$el);
                                 
            });
        },
                

        getExtraCurricular: function () {
    
            require(["app/views/ExtraCurricularList"], function (ExtraCurricularList) {
                that.body.removeClass('left-nav');
                slider.slidePage(new ExtraCurricularList().$el);
                                    
            });
        },

                
        getExtraCurricularItem: function (type) {
            
            require(["app/views/ExtraCurricularItem"], function (ExtraCurricularItem) { 
                that.body.removeClass('left-nav');
                slider.slidePage(new ExtraCurricularItem({type:type}).$el);               
             });
        },
                
        getMap: function () {
            
            require(["app/views/Map"], function (Map) {    
                var mapView = new Map();
                //mapView.delegateEvents();
                that.body.removeClass('left-nav');
                slider.slidePage(mapView.$el);
                mapView.render();
                //google.maps.event.trigger(mapView.map, 'resize');
             });
        },
          
        getContact: function () {
            
            require(["app/views/Contact"], function (Contact) { 
                that.body.removeClass('left-nav');
                slider.slidePage(new Contact().$el);               
             });
        },
                
        getNotification: function () {
            
            require(["app/models/device", "app/views/Notification"], function (model, Notification) {
                
                  if(typeof(deviceModel)==='undefined' || deviceModel===null){

                        var storage = window.localStorage;
                        var device_id = storage.getItem('mountmercy_device_id');
                        var api_key = storage.getItem('mountmercy_api_key');

                        deviceModel = new model.Device({id:device_id});

                        if(typeof(device_id)==='undefined' || device_id===null || typeof(api_key)==='undefined' || api_key===null){
                            that.body.removeClass('left-nav');
                            alert('There was a problem with notifications, please contact the developer');
                            window.location.hash = "news";
                        }
                        else{
                            deviceModel.fetch({
                                api: true,
                                headers: {device_id:device_id,api_key:api_key},        
                                success: function (data) {
                                    that.body.removeClass('left-nav');
                                    slider.slidePage(new Notification({model: data, storage:storage}).$el);                          
                                }
                            });
                        }
                    
                  }else{    
                        console.log('in the else');
                        that.body.removeClass('left-nav');
                        slider.slidePage(new Notification({model: deviceModel, storage:storage}).$el);    
                  }

       
             });
        },
                
        getWayPay: function () {
            
            require(["app/views/WayPay"], function (WayPay) {
                that.body.removeClass('left-nav');
                slider.slidePage(new WayPay().$el);               
             });
        },
                
        getArticle: function (id) {
             
            require(["app/models/article", "app/views/Article"], function (models, Article) {
                
                var storage = window.localStorage;
                var device_id = storage.getItem('mountmercy_device_id');
                var api_key = storage.getItem('mountmercy_api_key');
             
                var article = new models.Article({id: id});
                
                article.fetch({
                    api: true,
                    headers: {device_id:device_id,api_key:api_key},
                    success: function (data) {
                        slider.slidePage(new Article({model: data}).$el);
                    },
                    error: function(){
                        console.log('failed to fecth artcie');
                    }
                });
            });
        },
                
        getAboutUs: function () {
            
            /*
            require(["app/views/AboutUs"], function (AboutUs) { 
                that.body.removeClass('left-nav');
                slider.slidePage(new AboutUs().$el);               
             });*/
            
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
                            //app.updateRegId(device_id, api_key, reg_id);
                        },
                        error:   function(model, xhr, options){
                            alert('there was an error 2');
                            console.log('***********error is *******************');
                            console.log(xhr);
                        },
                    });
            });
        },
    });

});