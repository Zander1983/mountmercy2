define(function (require) {

    "use strict";

    var Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        Useful      = require('app/utils/useful_func'),
        slider      = new PageSlider($('body')),
        news,
        calendar,
        articles,
        deviceModel,
        photos,
        albums,
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
            "albums": "getAlbums",
            "photos/:id": "getPhotos",
            "photo-item/:id": "getPhotoItem",
        },
        
        
        initialize: function() {   
            
            that = this;
            that.body = $('body');
            
            //this.bind( "route", this.routeChange);
            
            this.storage = window.localStorage;

            this.setDeviceDetails();
 
            if(typeof(this.device_id)!=='undefined' && this.device_id!==null){
                //only update counter if we know device_id. the first time gets installed, 
                //we wont be able to get device_id cos it can take some time to come back from registering
                //with apple/google
                this.updateMessageCounter();
            }
       

            $.ajaxPrefilter( function( options, originalOptions, jqXHR ) { 
                
                if(options.pure_ajax==true){
                    return;
                }

                if(options.api==true){
                    //172.16.22.68
                    //options.url = "http://localhost/schoolspace/device_api" + options.url;
                    
                    if(options.update_notification==true){
                       //options.url = "http://localhost/schoolspace/device_api/update_notification" + options.url+"";   
                       options.url = server_url+"/device_api/update_notification" + options.url+"";   
                    }
                    else{
                        //options.url = "http://localhost/schoolspace/device_api" + options.url;   
                        options.url = server_url+"/device_api" + options.url;          

                    }
                    
                }
                else{
                    if(options.full_url==true){
   
                    }
                    else{
                        //this is when testing in a browser
                        options.url = 'http://localhost/schoolspace/cli/mountmercy2/www/scripts' + options.url
                    }
                }
  
           });

        },
                
        setDeviceDetails: function(){
  
            this.device_id = this.storage.getItem(project_title+'_device_id');
            this.api_key = this.storage.getItem(project_title+'_api_key');
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
                            Useful.correctView(that.body);
                            if(Backbone.history.fragment==="" || Backbone.history.fragment==="news"){
                                slider.slidePage(new NewsList({collection: collection, message_count:that.message_count}).$el);    
                            }
                        }
                    });
                    
                }
                else{
                    Useful.correctView(that.body);
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
                            Useful.correctView(that.body);
                            slider.slidePage(new CalendarList({collection: collection, message_count:that.message_count}).$el);                          
                        }
                    });
                }
                else{
                    Useful.correctView(that.body);
                    slider.slidePage(new CalendarList({collection: calendar, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        getNewsItem: function (id) {

            require(["app/views/NewsItem"], function (NewsItem) {
                 Useful.correctView(that.body);
               //  slider.slidePage(new NewsItem({model: news.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                
        getCalendarItem: function (id) {

            require(["app/views/CalendarItem"], function (CalendarItem) {
                 Useful.correctView(that.body);
                 slider.slidePage(new CalendarItem({model: calendar.get(id), message_count:that.message_count}).$el);
                                 
            });
        },
                

        getExtraCurricular: function () {
    
            require(["app/views/ExtraCurricularList"], function (ExtraCurricularList) {
                Useful.correctView(that.body);

                slider.slidePage(new ExtraCurricularList({message_count:that.message_count}).$el);
                                    
            });
        },

                
        getExtraCurricularItem: function (type) {
            
            require(["app/views/ExtraCurricularItem"], function (ExtraCurricularItem) { 
                Useful.correctView(that.body);
                slider.slidePage(new ExtraCurricularItem({type:type, message_count:that.message_count}).$el);               
             });
        },
                
        getMap: function () {
            
            require(["app/views/Map"], function (Map) {    
                var mapView = new Map({message_count:that.message_count});
                //mapView.delegateEvents();
                Useful.correctView(that.body);
                slider.slidePage(mapView.$el);
                mapView.render();
                //google.maps.event.trigger(mapView.map, 'resize');
             });
        },
          
        getContact: function () {
            
            require(["app/views/Contact"], function (Contact) { 
                Useful.correctView(that.body);
                
                var contactView = new Contact({message_count:that.message_count}).$el; 
                slider.slidePage(contactView);   
            
             });
        },
                
        getNotification: function () {
            
            require(["app/models/device", "app/views/Notification"], function (model, Notification) {
                
                  if(typeof(deviceModel)==='undefined' || deviceModel===null){

                        deviceModel = new model.Device({id:that.device_id});
                        
                        if(typeof(that.device_id)==='undefined' || that.device_id===null){
                            that.setDeviceDetails();
                        }

                        if(typeof(that.device_id)==='undefined' || that.device_id===null || typeof(that.api_key)==='undefined' || that.api_key===null){
                            Useful.correctView(that.body);
                            Useful.showAlert('Could not get notification settings, please try again later', 'Problem');
                            window.location.hash = "news";
                        }
                        else{              
                            deviceModel.fetch({
                                api: true,
                                headers: {device_id:that.device_id,api_key:that.api_key},        
                                success: function (data) {
                                    Useful.correctView(that.body);
                                    slider.slidePage(new Notification({model: data, 
                                                                        message_count:that.message_count
                                                                        }).$el);                          
                                }
                            });
                        }
                    
                  }else{    
                        Useful.correctView(that.body);
                        slider.slidePage(new Notification({model: deviceModel, 
                                                            message_count:that.message_count
                                                            }).$el);    
                  }

             });
        },
                
        getWayPay: function () {
            
            require(["app/views/WayPay"], function (WayPay) {
                Useful.correctView(that.body);
                slider.slidePage(new WayPay({message_count:that.message_count}).$el);               
             });
        },
                
        getArticle: function (id) {
             
            require(["app/models/article", "app/views/Article"], function (models, Article) {
                               
                if(typeof(articles)==='undefined' || articles===null){
                    
                    if(typeof(that.device_id)==='undefined' || that.device_id===null){
                        that.setDeviceDetails();
                    }

                    var article = new models.Article({id: id});

                    article.fetch({
                        api: true,
                        headers: {device_id:that.device_id,api_key:that.api_key},
                        success: function (data) {
                            var articleView = new Article({model: data, message_count:that.message_count});

                            Useful.correctView(that.body);
                            slider.slidePage(articleView.$el);

                            $.when(articleView.saveView()).done(function(data){
                                that.message_count = data.count;
                            });
          
                            data.set('seen', '1');

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
                                                    
                    Useful.correctView(that.body);
                    slider.slidePage(articleView.$el);

                    $.when(articleView.saveView()).done(function(data){
                        that.message_count = data.count;
                    });

                    articles.get(id).set('seen', '1');

                }

            });
        },
        
        
        getArticles: function (project_title) {
            
            require(["app/models/article", "app/views/ArticleList"], function (models, ArticleList) {
             
                if(typeof(articles)==='undefined' || articles===null){
                    
                    if(typeof(that.device_id)==='undefined' || that.device_id===null){
                        that.setDeviceDetails();
                    }
                    
                    if(typeof(that.device_id)!=='undefined' && that.device_id!==null){
                       
                        articles = new models.ArticleCollection({device_id: that.device_id, project_title: project_title
                                                                });

                        articles.fetch({
                            api: true,
                            headers: {device_id:that.device_id,api_key:that.api_key},
                            success: function (collection) {

                                Useful.correctView(that.body);
                                slider.slidePage(new ArticleList({collection: collection,message_count:that.message_count}).$el);
                            }, 
                            error: function(model, xhr, options){
                                    console.log('there was an error, response is ');
                                    console.log(xhr.responseText);
                            }
                        }); 
                        
                    }
                    else{
                        Useful.showAlert('There was a problem accessing messages, please close and reopen app and try again', 'One moment...');
                    }


                }
                else{

                    Useful.correctView(that.body);
                    slider.slidePage(new ArticleList({collection: articles,message_count:that.message_count}).$el);
                }
  

            });
        },
        
                
        getAboutUs: function () {
                       
            require(["app/views/AboutUs"], function (AboutUs) { 
                Useful.correctView(that.body);
                slider.slidePage(new AboutUs({message_count:that.message_count}).$el);               
             });
        },
                
                
        getAlbums: function (id) {

            require(["app/models/album", "app/views/AlbumList"], function (model, AlbumList) {

                if(typeof(albums)==='undefined' || albums===null){
                    albums = new model.AlbumCollection();
                    
                    albums.fetch({
                        full_url: true,
                        success: function (collection) {
                            Useful.correctView(that.body);
                            slider.slidePage(new AlbumList({collection: collection, message_count:that.message_count}).$el);                          
                        }
                    });
                }
                else{
                    Useful.correctView(that.body);
                    slider.slidePage(new AlbumList({collection: albums, message_count:that.message_count}).$el);
                }
                            
            });
        },
        
        
        getPhotos: function (id) {
            require(["app/models/photo", "app/views/PhotoList"], function (model, PhotoList) {
                
                    if(typeof(photos)!=='undefined' && photos!==null){
                        photos.reset();
                    }
                    
                    photos = new model.PhotoCollection([], { album_id: id });
 
                    photos.fetch({
                        full_url: true,
                        success: function (collection) {
                            Useful.correctView(that.body);

                            var photoView = new PhotoList({collection: collection, 
                                                           album_name:albums.get(id).get('name'), 
                                                            message_count:that.message_count});
                            slider.slidePage(photoView.$el);   
                            //photoView.initMasonary();
                            
                        }
                    });
                                 
            });
        },
        
        
        getPhotoItem: function (id) {
            //body.removeClass('left-nav');
            require(["app/views/PhotoItem"], function (PhotoItem) {
                 Useful.correctView(that.body);
                 slider.slidePage(new PhotoItem({model: photos.get(id), message_count:that.message_count}).$el);
                           
            });
        },
                
        updateMessageCounter: function(){
       
            require(["app/models/article_view"], function (models) {
           
                var article_view_count = new models.ArticleViewCount({device_id: that.device_id, 
                                                                      project_title: project_title
                                                                        });
                
                article_view_count.fetch( 
                    {
                    api: true,
                    headers: {device_id:that.device_id,api_key:that.api_key},
                    success: function (data) {
                        that.message_count = data.get('count');
                        Useful.updateCountEl(that.message_count);
     
                    },
                    error: function(){
                        console.log('failed updateMessageCounter');
                    }
                }); 
                
            });
            
        }
    });

});