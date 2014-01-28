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
            console.log('in updateCountEl ');
            var el = $('#message-count');
            console.log('el is ');
            console.log(el);
            if(count>0){
                console.log('in updateCountEl if and count is ');
                console.log(count);
                el.html(count);
                if(!el.hasClass('topcoat-notification')){
                    el.addClass('topcoat-notification');
                }
                console.log('outerHTML is ');
                console.log(el[0].outerHTML);
            }
            else{
                console.log('in updateCountEl else');
                //so its 0, remove class and empty html
                el.removeClass('topcoat-notification');
                el.empty();
            }

    };
    
    return UsefulFuncs;

    
});