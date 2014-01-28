define(function (require) {

    "use strict";

    var Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        Useful              = require('app/utils/useful_func'),
        slider = new PageSlider($('body')),
        news,
        calendar,
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

            this.device_id = this.storage.getItem(project_title+'_device_id');
            this.api_key = this.storage.getItem(project_title+'_api_key');
            
            this.updateMessageCounter(this.device_id);

            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) { 
                
                if(options.pure_ajax==true){
                    return;
                }

                if(options.api==true){
                    //172.16.22.68
                    //options.url = "http://localhost/schoolspace/device_api" + options.url;
                    
                    if(options.update_notification==true){
                       //options.url = "http://localhost/schoolspace/device_api/update_notification" + options.url+"";   
                       options.url = "http://push.schoolspace.ie/device_api/update_notification" + options.url+"";   
                    }
                    else{
                        //options.url = "http://localhost/schoolspace/device_api" + options.url;   
                        options.url = "http://push.schoolspace.ie/device_api" + options.url;                        
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
       
                console.log('in getNews and that.message_count is ');
                console.log(that.message_count);
       
                if(typeof(news)==='undefined' || news===null){
                    news = new model.NewsCollection();
                    
                    news.fetch({
                        full_url: true,
                        success: function (collection) {
                            that.body.removeClass('left-nav');
                            slider.slidePage(new NewsList({collection: collection, message_count:that.message_count}).$el);    
                            //that.updateMessageCounter();
                        }
                    });
                    
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new NewsList({collection: news, message_count:that.message_count}).$el);
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
                            that.body.removeClass('left-nav');
                            slider.slidePage(new CalendarList({collection: collection, message_count:that.message_count}).$el);                          
                        }
                    });
                }
                else{
                    that.body.removeClass('left-nav');
                    slider.slidePage(new CalendarList({collection: calendar, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getNewsItem: function (id) {

            require(["app/views/NewsItem"], function (NewsItem) {
                that.body.removeClass('left-nav');
                 slider.slidePage(new NewsItem({model: news.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
        getCalendarItem: function (id) {

            require(["app/views/CalendarItem"], function (CalendarItem) {
                that.body.removeClass('left-nav');
                 slider.slidePage(new CalendarItem({model: calendar.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                

        getExtraCurricular: function () {
    
            require(["app/views/ExtraCurricularList"], function (ExtraCurricularList) {
                that.body.removeClass('left-nav');

                slider.slidePage(new ExtraCurricularList({message_count:that.message_count}).$el);
                                    
            });
        },

                
        getExtraCurricularItem: function (type) {
            
            require(["app/views/ExtraCurricularItem"], function (ExtraCurricularItem) { 
                that.body.removeClass('left-nav');
                slider.slidePage(new ExtraCurricularItem({type:type, message_count:that.message_count}).$el);               
             });
        },
                
        getMap: function () {
            
            require(["app/views/Map"], function (Map) {    
                var mapView = new Map({message_count:that.message_count});
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
                
                var contactView = new Contact({message_count:that.message_count}).$el; 
                slider.slidePage(contactView);   
                
                console.log('contactView is ');
                console.log(contactView);
                console.log('find is ');
                console.log(contactView.find('#message-count'));
                
                var el = $('#message-count');
                console.log('outerHTML is ');
                console.log(el[0].outerHTML);
                
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
                                    slider.slidePage(new Notification({model: data, storage:storage, 
                                                                        message_count:that.message_count
                                                                        }).$el);                          
                                }
                            });
                        }
                    
                  }else{    
      
                        that.body.removeClass('left-nav');
                        slider.slidePage(new Notification({model: deviceModel, storage:storage, 
                                                            message_count:that.message_count
                                                            }).$el);    
                  }

       
             });
        },
                
        getWayPay: function () {
            
            require(["app/views/WayPay"], function (WayPay) {
                that.body.removeClass('left-nav');
                slider.slidePage(new WayPay({message_count:that.message_count}).$el);               
             });
        },
                
        getArticle: function (id) {
             
            require(["app/models/article", "app/views/Article"], function (models, Article) {
                               
                if(typeof(articles)==='undefined' || articles===null){

                    var article = new models.Article({id: id});

                    article.fetch({
                        api: true,
                        headers: {device_id:that.device_id,api_key:that.api_key},
                        success: function (data) {
                            var articleView = new Article({model: data, message_count:that.message_count});

                            slider.slidePage(articleView.$el);

                            $.when(articleView.saveView()).done(function(data){
                                that.message_count = data.count;
                            });

                        },
                        error: function(){
                            console.log('failed to fecth artcie'); 
                        }
                    });
                    
                }
                else{
                    var articleView = new Article({model: articles.get(id), 
                                                   device_id:that.device_id,
                                                   api_key:that.api_key,
                                                   message_count:that.message_count
                                                    });
                    that.body.removeClass('left-nav');
                    slider.slidePage(articleView.$el);

                    $.when(articleView.saveView()).done(function(data){
                        that.message_count = data.count;
                    });
                            
                }

            });
        },
        
        
        getArticles: function (project_title) {
            
            require(["app/models/article", "app/views/ArticleList"], function (models, ArticleList) {
             
                articles = new models.ArticleCollection({device_id: that.device_id, project_title: project_title
                                                        });
    
                articles.fetch({
                    api: true,
                    headers: {device_id:that.device_id,api_key:that.api_key},
                    success: function (collection) {
                        that.body.removeClass('left-nav');
                        slider.slidePage(new ArticleList({collection: collection,message_count:that.message_count}).$el);
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
                slider.slidePage(new AboutUs({message_count:that.message_count}).$el);               
             });
        },
                
        updateMessageCounter: function(){
       
            require(["app/models/article_view"], function (models) {
           
                var article_view_count = new models.ArticleViewCount({device_id: that.device_id, 
                                                                      project_title: project_title
                                                                        });
                
                return article_view_count.fetch( 
                    {
                    api: true,
                    headers: {device_id:that.device_id,api_key:that.api_key},
                    success: function (data) {
                        console.log('in updateMessageCounter success and count is ');
                        console.log(data.get('count'));
                        that.message_count = data.get('count');
                        Useful.updateCountEl(that.message_count);
                        /*if(message_count>0){
                            //topcoat-notification
                            var unread = $('#unread-count');
                            unread.html(message_count);
                            unread.addClass('topcoat-notification');
                        }*/
                    },
                    error: function(){
                        console.log('failed updateMessageCounter');
                    }
                }); 
                
            });
            
        }
    });

});