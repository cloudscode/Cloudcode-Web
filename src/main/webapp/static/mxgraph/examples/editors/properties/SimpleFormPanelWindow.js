Ext.define('com.hh.global.SimpleFormPanelWindow', {
	extend : 'com.hh.base.BaseServicePanel',
	modal : true,
	icon : '/hhcommon/images/extjsico/bogus.png',
	constructor : function(config) {
		this.config = config || {};
		this.callParent(arguments);
		this.add(this.createFormPanel());
		this.loadData();
	},
	loadData : function() {
		FormPanel.setValues(this.form, this.object);
	},
	submitForm : function() {
		var values = this.form.getForm().getValues();
		var items = this.form.getForm().getFields().items;
		for ( var i = 0; i < items.length; i++) {
			if (items[i].xtype == 'checkbox') {
				values[items[i].getName()] = items[i].getValue();
			}
		}
		var objdocument = this.config.objdocument;
		var cell = this.config.cell;
		cell.id = values['id'];
		objdocument.hideProperties();
		var model = objdocument.graph.getModel();
		var value = model.getValue(cell);
		if (mxUtils.isNode(value)) {
			var attrs = value.attributes;
			model.beginUpdate();
			try {
				for ( var i = 0; i < attrs.length; i++) {
					var edit = null;
					if (attrs[i].nodeName == 'data') {
						edit = new mxCellAttributeChange(cell,
								attrs[i].nodeName, Ext.encode(values));
					} else {
						edit = new mxCellAttributeChange(cell,
								attrs[i].nodeName,
								values[attrs[i].nodeName] == null ? ""
										: values[attrs[i].nodeName]);
					}
					model.execute(edit);
				}
				if (objdocument.graph.isAutoSizeCell(cell)) {
					objdocument.graph.updateCellSize(cell);
				}
				this.up('window').close();
				Ext.example.msg('提示', '操作成功！');
			} finally {
				model.endUpdate();
			}

		}
	},
	getBtnByType : function(type) {
		var page = this;
		if ("save" == type) {
			return {
				iconCls : 'yes',
				text : '保    存',
				handler : function() {
					page.submitForm();
				}
			};
		} else if ("cancel" == type) {
			return {
				iconCls : 'cancel',
				text : '取    消',
				handler : function() {
					this.up('window').close();
				}
			};
		}
	},
	getBtns : function() {
		return [ this.getBtnByType("save"), this.getBtnByType("cancel") ];
	},
	createFormPanel : function() {
		var page = this;
		this.form = Ext.create('com.hh.base.BaseFormPanel', {
			items : this.getFormItems(),
			buttons : page.getBtns()
		});
		return this.form;
	}
});
