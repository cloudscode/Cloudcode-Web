Ext.define('com.hh.workflow.properties.FormManager', {
	extend : 'com.hh.global.SimpleFormPanelWindow',
	title : '任务属性',
	width : 600,
	constructor : function(config) {
		this.config = config || {};
		this.superclass.constructor.call(this, this.config);
		var page = this;
		page.setFormManagerValue(page.formDataId);
	},
	setFormManagerValue : function(formDataId) {
		var page = this;
		if (formDataId) {
			Request.request("form-FormWidget-findObjectByDataId", {
				dataId : formDataId
			}, function(result) {
				page.updateFormManagerValue(result);
			});
		}
	},
	submitForm : function() {
		var page = this;
		page.formManagerField.setValue(page.form.getForm().findField(
				'formManager').getValue());
		this.up('window').close();
	},
	updateFormManagerValue : function(result) {
		var page = this;
		var formManagerField =page.formManagerField;
		var formManagerObject = {};
		if (formManagerField.getValue()) {
			formManagerObject = Ext.decode(formManagerField.getValue())
					.toObject('name');
		}
		var formSource = result.formSource;
		var dataList = [];
		if (formSource != null) {
			formSource = Ext.decode(formSource);
			for ( var i = 0; i < formSource.length; i++) {
				var data = formManagerObject[formSource[i].name];
				if (data == null) {
					data = {};
				}
				Ext.apply(data, {
					text : formSource[i].fieldLabel,
					name : formSource[i].name
				});
				dataList.push(data);
			}
			 page.form.getForm().findField('formManager').setValue(dataList);
		}
	},
	getFormItems : function() {
		var page = this;
		return [ {
			fieldLabel : '表单控制',
			xtype : 'widgetGridField',
			columnWidth : 1,
			name : 'formManager',
			getFields : function() {
				return [ 'text', 'name', 'readOnly', 'hidden' ];
			},
			getColumns : function() {
				return [ {
					header : '字段名',
					dataIndex : 'text',
					flex : 1
				}, {
					header : '名称',
					dataIndex : 'name',
					flex : 1
				}, {
					header : '只读',
					xtype : 'checkcolumn',
					dataIndex : 'readOnly',
					width : 40
				}, {
					header : '隐藏',
					xtype : 'checkcolumn',
					dataIndex : 'hidden',
					width : 40
				} ];
			},
			getTbar : function() {
				return [];
			}
		} ];
	}
});