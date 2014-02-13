define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "",
        src = "",
        thumbnail = "",
        summary = "",
        
        Photo = Backbone.Model.extend({  
 
        }),

        
        PhotoCollection = Backbone.Collection.extend({

            model: Photo,
            
            url: function(){
                    return "https://picasaweb.google.com/data/feed/api/user/101422180005529258056/albumid/"+this.album_id;
                 },
            
            //This is used so I can test on a browser. On a device, use the direct link
           
           /*
            url: function(){
                    return "/school-proxy.php?type=photos&album_id="+this.album_id;
                 },*/
            
            initialize: function (models, options) {
                 this.album_id = options.album_id;
                //this.players = new PlayerCollection();
                //this.players.url = this.url + "/" + this.team_id;
            },
        
            parse: function (data) {
                xml = data;
                parsed = [];
              
                $(xml).find('entry').each(function (index) {
     
                    
                    title = $(this).find('title:first').text();    
                    src = $(this).find('content:first').attr('src');
                    summary = $(this).find('summary:first').text();
                    
                    thumbnail = $(this).find('thumbnail:eq(0)').attr('url');

                    parsed.push({id:id, title: title, summary:summary, src:src, thumbnail:thumbnail});
                    id++;
                    
                    title, src, summary, thumbnail = "";
                    
                });

                return parsed;
            },
                    

            fetch: function (options) {
                options = options || {};
                options.dataType = "xml";
                return Backbone.Collection.prototype.fetch.call(this, options);
            }

        });


    return {
        Photo: Photo,
        PhotoCollection: PhotoCollection
    };

});