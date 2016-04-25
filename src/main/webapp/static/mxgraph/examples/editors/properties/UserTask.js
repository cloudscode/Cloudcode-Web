Ext.define('com.hh.workflow.properties.UserTask', {
	extend : 'com.hh.global.SimpleFormPanelWindow',
	title : '任务属性',
	width : 600,
	constructor : function(config) {
		this.config = config || {};
		this.superclass.constructor.call(this, this.config);
		var page = this;
		var hrefField = this.form.getForm().findField('href');
		var hrefParamsField = this.form.getForm().findField('hrefParams');
		if (hrefParamsField.getValue() != null
				&& hrefParamsField.getValue() != ''
				&& hrefParamsField.getValue() != {}
				&& hrefParamsField.getValue() != '{}') {
			var formDataId = Ext.decode(hrefParamsField.getValue()).formDataId;
			page.formDataId=formDataId;
		} else if (this.rootobject.hrefParams) {
			var formDataId = Ext.decode(this.rootobject.hrefParams).formDataId;
			page.formDataId=formDataId;
		}
	},
	formDataId:null,
	getFormItems : function() {
		var page = this;
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
					fieldLabel : '附件',
					xtype : 'checkbox',
					name : 'attachment',
					columnWidth : 0.5
				}, {
					fieldLabel : '意见',
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
						page.setFormManagerValue(record.get("id"));
					}
				}, {
					fieldLabel : '表单参数',
					xtype : 'widgetPropertiesField',
					columnWidth : 1,
					name : 'hrefParams'
				}, {
					name : 'users',
					xtype : 'widgetUserSelect',
					fieldLabel : '候选用户'
				}, {
					name : 'orgs',
					xtype : 'widgetOrgSelect',
					fieldLabel : '组织机构',
					columnWidth : 0.8
				}, {
					fieldLabel : '隐藏',
					xtype : 'checkbox',
					name : 'isorg',
					columnWidth : 0.2,
					labelWidth : 40
				}, {
					allowBlank : true,
					multiSelect : true,
					xtype : 'widgetComboBox',
					fieldLabel : '候选角色',
					name : 'roles',
					action : 'usersystem-role-queryAllRoleList',
					columnWidth : 0.8
				}, {
					fieldLabel : '隐藏',
					xtype : 'checkbox',
					name : 'isrole',
					columnWidth : 0.2,
					labelWidth : 40
				}, {
					fieldLabel : 'type',
					name : 'type',
					hidden : true,
					columnWidth : 0.5
				}, {
					fieldLabel : 'type',
					name : 'formManager',
					hidden : true,
					columnWidth : 0.5
				}];
	},
	getBtns : function() {
		var page = this;
		return [ {
			iconCls : 'yes',
			text : '表单控制',
			handler : function() {
				 ExtUtil.openPanel( Ext.create('com.hh.workflow.properties.FormManager',{
					 formDataId:page.formDataId,
					 formManagerField : page.form.getForm().findField('formManager')
				 }));
			}
		},this.getBtnByType("save"), this.getBtnByType("cancel") ];
	}
});