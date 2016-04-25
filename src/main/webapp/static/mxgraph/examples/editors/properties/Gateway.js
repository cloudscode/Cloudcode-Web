Ext.define('com.hh.workflow.properties.Gateway', {
	extend : 'com.hh.global.SimpleFormPanelWindow',
	title : '分支属性',
	width : 600,
	constructor : function(config) {
		this.config = config || {};
		this.superclass.constructor.call(this, this.config);
	},
	getFormItems : function() {
		var page = this;
		return [ {
			fieldLabel : 'type',
			name : 'type',
			hidden : true,
			columnWidth : 0.5
		}, {
			fieldLabel : 'ID',
			name : 'id',
			columnWidth : 0.5
		}, {
			fieldLabel : '名称',
			name : 'label',
			allowBlank : false,
			columnWidth : 0.5
		}, {
			fieldLabel : '结束分支',
			xtype : 'checkbox',
			name : 'endGateway',
			columnWidth : 0.5
		} ];
	}
});