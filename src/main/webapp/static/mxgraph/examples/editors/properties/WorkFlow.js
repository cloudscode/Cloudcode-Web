Ext.define('com.hh.workflow.properties.WorkFlow', {
	extend : 'com.hh.global.SimpleFormPanelWindow',
	title : '工作流属性',
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
					columnWidth : 0.5,
					readOnly : true
				}, {
					fieldLabel : '隐藏附件',
					xtype : 'checkbox',
					name : 'attachment',
					columnWidth : 0.5
				}, {
					fieldLabel : '隐藏意见',
					xtype : 'checkbox',
					name : 'comment',
					columnWidth : 0.5
				}, {
					"xtype" : "widgetComboBoxTree",
					"name" : "href",
					"fieldLabel" : "表单",
					"allowBlank" : false,
					editable : true,
					submitType : 'text',
					"action" : "form-FormTree-queryTreeList",
//					"extraParams" : "{'table_name':'hh_xt_data','type':'form_tree'}",
//					"paramType" : "paramsMap",
					columnWidth : 1,
					afitemclick : function(view, record) {
						this.setValue("com.hh.workflow.form.FormPageEdit");
						var keformdataid = this.nextSibling().varGridStore
								.findRecord('key', 'formDataId');
						if (keformdataid) {
							this.nextSibling().varGridStore
									.remove(keformdataid);
						}
						this.nextSibling().varGridStore.add({
									"key" : 'formDataId',
									"value" : record.get("id")
								});
					}
				}, {
					fieldLabel : '表单参数',
					xtype : 'widgetPropertiesField',
					columnWidth : 1,
					name : 'hrefParams'
				}];
	}
});