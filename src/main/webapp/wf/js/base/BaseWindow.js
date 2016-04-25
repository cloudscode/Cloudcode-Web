Ext.define('com.hh.base.BaseWindow', {
	extend : 'Ext.window.Window',
	icon : '/hhcommon/images/extjsico/bogus.png',
	maximizable : true,
	minimizable : true,
	stateful : false,
	isWindow : true,
	active : true,
	shadow : false,
	constrainHeader : true,
	title : '未命名',
	width : Browser.getWidth() - 300,
	height : Browser.getHeight() - 100,
	layout : {
		type : 'fit',
		padding : '2 2 2 2'
	}
});