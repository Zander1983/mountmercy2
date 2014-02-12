<?php

//file_put_contents('/var/www/my_logs/cbc.log', 'top of file   ', FILE_APPEND);
    
$type = $_GET['type'];

    
if($type=='news'){
    $xml = file_get_contents('http://mountmercy.scoilnet.ie/blog/feed/');    
}
elseif ($type=='calendar') { 
    $xml = file_get_contents('https://www.google.com/calendar/feeds/mountmercycollegecork@gmail.com/public/full?orderby=starttime&sortorder=ascending&max-results=10&futureevents=true');

    
 //https://www.google.com/calendar/feeds/mountmercycollegecork@gmail.com/public/full?orderby=starttime&sortorder=ascending&max-results=3&futureevents=true&alt=json
    
}
elseif($type=="albums"){
        $xml = file_get_contents('https://picasaweb.google.com/data/feed/api/user/101422180005529258056');

    //    file_put_contents('/var/www/my_logs/xml.log', $xml);
}
elseif ($type=='photos') { 
    
    $album_id = $_GET['album_id'];

    $url = 'https://picasaweb.google.com/data/feed/api/user/101422180005529258056/albumid/'.$album_id;
    $xml = file_get_contents($url);

    file_put_contents('/var/www/my_logs/photos.log', $url);
    
}
echo $xml;

