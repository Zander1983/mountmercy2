define(function (require) {

    "use strict";

    var Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
    
        slider = new PageSlider($('body')),
        news,
        calendar,
        article,
        articles,
        deviceModel,
        that;

    return Backbone.Router.extend({

        routes: {
            "": "getNews",
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
            "articles/:project_title": "getArticles",
        },
        
        initialize: function() {   
            that = this;
            that.body = $('body');
            
            this.bind( "route", this.routeChange);
            
            this.storage = window.localStorage;
            this.device_id = this.storage.getItem('mountmercy_device_id');
            this.api_key = this.storage.getItem('mountmercy_api_key');

            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) { 
                
                if(options.pure_ajax==true){
                    return;
                }

                if(options.api==true){
                    //172.16.22.68
                    //options.url = "http://localhost/schoolspace/device_api" + options.url;
                    
                    if(options.update_notification==true){
                       options.url = "http://localhost/schoolspace/device_api/update_notification" + options.url+"";   
                       //options.url = "http://push.schoolspace.ie/device_api/update_notification" + options.url+"";   
                    }
                    else{
                        options.url = "http://localhost/schoolspace/device_api" + options.url;   
                        //options.url = "http://push.schoolspace.ie/device_api" + options.url;                        
                    }
                    
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
                        full_url: false,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new NewsList({collection: collection}).$el);    
                            that.updateMessageCounter();
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
                        full_url: false,
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

                        deviceModel = new model.Device({id:that.device_id});

                        if(typeof(that.device_id)==='undefined' || that.device_id===null || typeof(that.api_key)==='undefined' || that.api_key===null){
                            that.body.removeClass('left-nav');
                            alert('There was a problem with notifications, please contact the developer');
                            window.location.hash = "news";
                        }
                        else{
                            deviceModel.fetch({
                                api: true,
                                headers: {device_id:that.device_id,api_key:that.api_key},        
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
                
                
                if(typeof(articles)==='undefined' || articles===null){

                    console.log('in the if so articles undefiened');



                    var article = new models.Article({id: id});

                    article.fetch({
                        api: true,
                        headers: {device_id:that.device_id,api_key:that.api_key},
                        success: function (data) {
                            slider.slidePage(new Article({model: data}).$el);
                        },
                        error: function(){
                            console.log('failed to fecth artcie');
                        }
                    });
                    
                }
                else{

                    that.body.removeClass('left-nav');
                     slider.slidePage(new Article({model: articles.get(id), 
                                                   device_id:that.device_id,
                                                   api_key:that.api_key
                                                    }).$el);
                }

            });
        },
        
        
        getArticles: function (project_title) {
            
            require(["app/models/article", "app/views/ArticleList"], function (models, ArticleList) {
             
                articles = new models.ArticleCollection({project_title: project_title});
    
                console.log('before the Articles fetch');
                articles.fetch({
                    api: true,
                    headers: {device_id:that.device_id,api_key:that.api_key},
                    success: function (collection) {
                        slider.slidePage(new ArticleList({collection: collection}).$el);
                    },
                    error: function(){
                        console.log('failed to fecth artcie');
                    }
                });   

            });
        },
        
                
        getAboutUs: function () {
            
            
            require(["app/views/AboutUs"], function (AboutUs) { 
                that.body.removeClass('left-nav');
                slider.slidePage(new AboutUs().$el);               
             });
        },
                
        updateMessageCounter: function(){
   
            
            require(["app/models/article_view"], function (models) {
           
                var article_view_count = new models.ArticleViewCount({id: that.device_id});
                article_view_count.fetch({
                    api: true,
                    headers: {device_id:that.device_id,api_key:that.api_key},
                    success: function (data) {
                        console.log('data is ');
                        console.log(data);
                    },
                    error: function(){
                        console.log('failed to fecth artcie');
                    }
                }); 
                
            });
            
        }
    });

});