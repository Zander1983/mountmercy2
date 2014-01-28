define(function (require) {

    "use strict";

    var Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "", 
        content = "",
        pubDate = "", 
        
        News = Backbone.Model.extend({  

        }),

        
        NewsCollection = Backbone.Collection.extend({

            model: News,
            url: 'http://mountmercy.scoilnet.ie/blog/feed/',
            
            //This is used so I can test on a browser. On a device, use the direct link
          
            /*
            url: function(){
                    return "/school-proxy.php?type=news";
                 },*/
            
        
            parse: function (data) {
        
                xml = data;
   
                $(xml).find('item').each(function (index) {
           
                    content = $(this).find('encoded').text();
                    
                    if(content.length===0){
                        content = $(this).find('content\\:encoded').text();                        
                    }
           
                    title = $(this).find('title').text();
                    
                    //description = $(this).find('description').text();

                    pubDate = $(this).find('pubDate').text();                    
                    pubDate = pubDate.substring(0, pubDate.length-15);

                    /*
                    var x=0;
                    $(description).find('img').each(function(i, obj){
     
                       if(x==0){
                            src = $(obj).attr('src');
                            if(src.indexOf('http') === -1){
                               //therefore its a relative path
                               description = description.replace(src,"http://mountmercy.schoolspace.ie"+src);
                               src = "http://mountmercy.schoolspace.ie" + src;
                            }
                       }
                       else{
                            other_src = $(obj).attr('src');
                            if(other_src.indexOf('http') === -1){
                                //therefore its a relative path
                                description = description.replace(other_src,"http://mountmercy.schoolspace.ie"+other_src);                         
                            }
                       }
                       x++;
                    });*/
       
                    parsed.push({id:id, title: title, 
                                 content:content, pubDate:pubDate});
                   id++;
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
        News: News,
        NewsCollection: NewsCollection
    };

});