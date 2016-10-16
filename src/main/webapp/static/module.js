requirejs.config({
    baseUrl: contextPath+'/static',
    paths: {
        jquery: 'jquery/jquery-1.10.2',
        jqueryui: 'jquery/ui/jquery-ui-1.10.3.custom.min',
        //jquerylayout: 'jquery/layout/jquery.layout-latest.min',
        WdatePicker: 'plugin/My97DatePicker/WdatePicker',
        validationEnginezn:'plugin/validation/jquery.validationEngine-zh_CN',
        validationEngine:'plugin/validation/jquery.validationEngine',
        CKEditor:'plugin/ckeditor/ckeditor',
        CKConfig:'plugin/ckeditor/config',
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
        textarea:'widgets/text/textarea',
        password:'widgets/text/password',
        ckeditor:'widgets/text/ckeditor',
        button:'widgets/button/button',
        validation:'widgets/validation/validation',
        combobox:'widgets/combobox/combobox',
        layout:'jquery/layout/jquery.layout-latest',
        layoutresizePaneAccordions:'jquery/layout/jquery.layout.resizePaneAccordions-latest',
        layoutthemeswitchertool:'jquery/layout/themeswitchertool'
    },
    shim:{
        'jqueryui':['jquery'],
        'jquerylayout':['jquery'],
    	'ztree':['jquery'],
    	'date':['WdatePicker'],
    	'CKConfig':['CKEditor'],
    	'ckeditor':['CKConfig'],
    	'validationEnginezn':['jquery'],
    	'validationEngine':['jquery','validationEnginezn'],
    	'validation':['jquery','validationEngine'],
    	'layout':['jquery'],
    }
});
requirejs(['jquery']);
//require(['text'], function (text){
//
//});


