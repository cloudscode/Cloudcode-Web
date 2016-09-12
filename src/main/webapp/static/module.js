requirejs.config({
    baseUrl: contextPath+'/static',
    paths: {
        jquery: 'jquery/jquery-1.10.2',
        jqueryui: 'jquery/ui/jquery-ui-1.10.3.custom.min',
        //jquerylayout: 'jquery/layout/jquery.layout-latest.min',
        WdatePicker: 'plugin/My97DatePicker/WdatePicker',
        text:'widgets/text/text',
        main:'widgets/main',
        select:'widgets/select/select',
        Dialog:'widgets/dialog/dialog',
        DialogClass:'widgets/dialog/dalogClass',
        Doing:'widgets/dialog/doing',
        Request:'widgets/request/request',
        tree:'widgets/tree/tree',
        ztree:'jquery/ztree/3.5.15/js/jquery.ztree.all-3.5.min',
        check:'widgets/check/check',
        checkbox:'widgets/check/checkbox',
        date:'widgets/date/date',
        radio:'widgets/radio/radio',
    },
    shim:{
        'jqueryui':['jquery'],
        'jquerylayout':['jquery'],
    	'ztree':['jquery'],
    	'date':['WdatePicker']
    }
});
requirejs(['jquery']);
//require(['text'], function (text){
//
//});


