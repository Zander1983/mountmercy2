define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        Moment              = require('moment'),
        id,
        xml,
        parsed_albums = [], 
        title = "", 
        album_id = "", 
        updated = "",
        
        
        Album = Backbone.Model.extend({  

 
        }),

        
        AlbumCollection = Backbone.Collection.extend({

            model: Album,
            url: 'https://picasaweb.google.com/data/feed/api/user/101422180005529258056',
      
            /*
            url: function(){
                    return "/school-proxy.php?type=albums";
                 },*/
        
            parse: function (data) {

                xml = data;
                parsed_albums = [];
              
                $(xml).find('entry').each(function (index) {
                    
                    id = $(this).find('id:eq(1)').text();
                    title = $(this).find('title:first').text();
                    album_id = $(this).find('id:last').text();
                    updated = $(this).find('updated').text();
                    
                    console.log('title is ');
                    console.log(title);
         
                    var t = updated.indexOf("T");
                    if(t !== -1){
                        updated = updated.substring(0,t);
                    }
                    
                    updated = moment(updated).format("MMM Do YY");                               
                    
                    parsed_albums.push({id:id, title: title, album_id:album_id, 
                                updated:updated});
                   
                });

                return parsed_albums;
            },
                    

            fetch: function (options) {
                options = options || {};
                options.dataType = "xml";
                return Backbone.Collection.prototype.fetch.call(this, options);
            }

        });


    return {
        Album: Album,
        AlbumCollection: AlbumCollection
    };

});