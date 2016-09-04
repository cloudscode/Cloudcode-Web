//debugger;
//requirejs([contextPath+"/static/jquery/jquery-1.10.2.js"], function($) {
//   console.log($);
//});

requirejs.config({
    baseUrl: contextPath+'/static',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'jquery/jquery-1.10.2',
        text:'widgets/text/text',
        main:'widgets/main'
    }
});
//define(['jquery'], function ($) {
//	
//	debugger;
//});
//console.log($);

requirejs(['jquery'], function( $ ) {//debugger;
   // console.log( $ ) // OK
	$.cc={};
	
});
require(['text'], function (text){
//	console.log( text);
//	$("[xtype]").each(function() {
//		text.render();
//	});
});
requirejs(['jquery','main'], function( $ ) {
	$("[xtype]").each(function() {
		$(this).render('initRender');
	});
});



//var text =require(["text"]);
//console.log( text);


