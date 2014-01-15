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
/*
elseif ($type=='academic') { 
       
    $xml = file_get_contents('http://mountmercy.schoolspace.ie/index.php?option=com_ninjarsssyndicator&feed_id=4&format=raw');
    
}
elseif($type=="extracurricular"){

    $xml = file_get_contents('http://mountmercy.schoolspace.ie/index.php?option=com_ninjarsssyndicator&feed_id=6&format=raw');    
    
}
elseif($type=="studentlife"){

    $xml = file_get_contents('http://mountmercy.schoolspace.ie/index.php?option=com_ninjarsssyndicator&feed_id=7&format=raw');    
    
}
*/

/*
$xml = '<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" version="2.0">
    <channel>
    <title>mountmercy.scoilnet.ie</title>
    <atom:link href="http://mountmercy.scoilnet.ie/blog/feed/" rel="self" type="application/rss+xml"/>
    <link>http://mountmercy.scoilnet.ie/blog</link>
    <description>Blog Of Mount Mercy College Cork</description>
    <lastBuildDate>Mon, 18 Nov 2013 20:28:02 +0000</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>http://wordpress.org/?v=3.6.1</generator>

    <item>
        <title>the title</title>

        <description>
        <![CDATA[
        the description
        ]]>
        </description>

        <content:encoded>
        <![CDATA[
            come content
        ]]>
        </content:encoded>

    </item>
    
    </channel>
</rss>';*/

echo $xml;

