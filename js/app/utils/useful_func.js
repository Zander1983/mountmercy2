define(function (require) {

    "use strict";

 
    var UsefulFuncs = {};

   
    UsefulFuncs.getMonth = function(date_str) {
    
        var objDate = new Date(date_str);

    };
  
  
    UsefulFuncs.hideAlert = function() {
        $('.alert').hide();
    };
    

    UsefulFuncs.loadURL = function (url){
        navigator.app.loadUrl(url, { openExternal:true });
        return false; 
    };
    
    
    UsefulFuncs.linkClicked = function (e) {    
        e.preventDefault();
        var url = $(e.currentTarget).attr("rel"); 
        UsefulFuncs.loadURL(url);
    };

    UsefulFuncs.walk_the_DOM = function walk(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            walk(node, func);
            node = node.nextSibling;
        }
    };
    
    /*
     * Very important function which removes all inner styling but leaves the tags. 
     * It also removes image height and width attributes
     */
    UsefulFuncs.removeStyles = function(html){
            
            var $html = $("<div>"+html+"</div>");
            
            $html.find('[style]').removeAttr('style');     
            $html.find('img').removeAttr('width').removeAttr('height');
            
            return $html.html();
    };
    
    
    UsefulFuncs.replaceURLWithHTMLLinks = function (text) {
            var exp = /(\b(www\.|http\:\/\/)\S+\b)/ig;
            return text.replace(exp,"<a href='$1'>$1</a>"); 
    };
    
    UsefulFuncs.updateCountEl = function (count) {
          
            var el = $('#message-count');
        
            if(count>0){
         
                el.html(count);
                if(!el.hasClass('topcoat-notification')){
                    el.addClass('topcoat-notification');
                }
         
            }
            else{
          
                //so its 0, remove class and empty html
                el.removeClass('topcoat-notification');
                el.empty();
            }

    };
    
    UsefulFuncs.correctView = function(body){
            
           body.removeClass('left-nav');
           body.scrollTop(0);
    };
    

    
    UsefulFuncs.showAlert = function(text, title) {
 
        navigator.notification.alert(
            text,  // message
            function(){},         // callback
            title            // title
        );
    };
    
    UsefulFuncs.showConfirm = function(text, title, klass) {
        return confirm(text);
        
        //navigator.notification.confirm();
        /*$('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();*/
    };
    
    return UsefulFuncs;

    
});