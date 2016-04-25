Ext.define('com.hh.workflow.properties.Start', {
	extend : 'com.hh.global.SimpleFormPanelWindow',
	title : '开始节点属性',
	width : 600,
	constructor : function(config) {
		this.config = config || {};
		this.superclass.constructor.call(this, this.config);
	},
	getFormItems : function() {
		return [{
					fieldLabel : 'ID',
					name : 'id',
					columnWidth : 0.5,
					readOnly : true
				}, {
					fieldLabel : '名称',
					name : 'label',
					allowBlank : false,
					columnWidth : 0.5
				}, {
					fieldLabel : 'type',
					name : 'type',
					hidden : true,
					columnWidth : 0.5
				}]
	}
});