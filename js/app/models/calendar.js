define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),
        id=1,
        xml,
        parsed = [], 
        title = "",
        content = "",
        when = "",
        startDateTime = "",
        endDateTime = "",
        startTime = "",
        endTime = "",
        startDate = "",
        endDate = "",
        month = "",
        date = "",
        
        Calendar = Backbone.Model.extend({  
 
        }),

        
        CalendarCollection = Backbone.Collection.extend({

            model: Calendar,
            url: 'https://www.google.com/calendar/feeds/mountmercycollegecork@gmail.com/public/full?orderby=starttime&sortorder=ascending&max-results=10&futureevents=true',
            
            //This is used so I can test on a browser. On a device, use the direct link
           
           /*
            url: function(){
                    return "/school-proxy.php?type=calendar";
                 },*/
            
        
            parse: function (data) {
                xml = data;

              
                $(xml).find('entry').each(function (index) {
      
                    title = $(this).find('title').text();
                    content = $(this).find('content').text();
                    when = $(this).find('when');
                    
                    startDateTime = when[0]['attributes']['startTime']['value'];
                    endDateTime = when[0]['attributes']['endTime']['value'];  
                    
                    var t = startDateTime.indexOf("T");
                    if(t !== -1){
                        //so there is a time, extract it
                        startTime = startDateTime.substring(t+1,t+6);
                        startDate = startDateTime.substring(0,t-1);
                    }
                    else{
                        //no time, so set the date
                        startDate = startDateTime;
                    }
                    
                    t = endDateTime.indexOf("T");
                    if(t !== -1){
                        //so there is a time, extract it
                        endTime = endDateTime.substring(t+1,t+6);
                        endDate = endDateTime.substring(0,t-1);
                    }
                    else{
                        //no time, so set the date
                        endDate = endDateTime;
                    }
                    
                    var dateObj = new Date(startDate);
                 
                    month = moment.monthsShort('-MMM-', dateObj.getMonth());
                    date = dateObj.getDate();    
                    
                    //convert to nice time
                    startDate = moment(startDate).format("MMM Do YY");
                    endDate = moment(endDate).format("MMM Do YY");
                    
                    parsed.push({id:id, title: title, content:content, 
                                month:month, date:date,
                                startDate:startDate, endDate:endDate,
                                startTime:startTime, endTime:endTime});
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
        Calendar: Calendar,
        CalendarCollection: CalendarCollection
    };

});