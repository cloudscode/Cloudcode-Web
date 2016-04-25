Ext
		.define(
				'com.hh.workflow.properties.Edge',
				{
					extend : 'com.hh.global.SimpleFormPanelWindow',
					title : '线属性',
					width : 600,
					constructor : function(config) {
						this.config = config || {};
						this.superclass.constructor.call(this, this.config);
						this.initWidget();
					},
					initWidget : function() {
						var page = this;
						if (this.rootobject.hrefParams != null
								&& this.rootobject.hrefParams != ''
								&& this.rootobject.hrefParams != {}
								&& this.rootobject.hrefParams != '{}') {
							var formDataId = Ext
									.decode(this.rootobject.hrefParams).formDataId;
							Request.request(
									"form-FormWidget-findObjectByDataId", {
										dataId : formDataId
									}, function(result) {
										page.insertBtn(result);
									});
						}
					},
					insertBtn : function(result) {
						var page = this;
						var formSource = result.formSource;
						if (formSource != null) {
							formSource = Ext.decode(formSource);
							for ( var i = 0; i < formSource.length; i++) {
								page.propertiesFields.add(Ext.widget("button",
										{
											text : formSource[i].fieldLabel,
											name : formSource[i].name,
											handler : function(btn) {
												page.cbtnClick(btn);
											}
										}));
							}
						}
					},
					cbtnClick : function(btn) {
						var page = this;
						if (page.form.getForm().findField('conditionType')
								.getRadioValue() == "0") {
							var condition = page.form.getForm().findField(
									'condition');
							condition.setValue(condition.getValue()
									+ " formObject." + btn.name);
						} else {
							ExtFrame.msg("请选择条件类型为输入条件！");
						}
					},
					cbtnClick2 : function(btn) {
						var page = this;
						if (page.form.getForm().findField('conditionType')
								.getRadioValue() == "0") {
							var condition = page.form.getForm().findField(
									'condition');
							condition.setValue(condition.getValue() + " "
									+ btn.name);
						} else {
							ExtFrame.msg("请选择条件类型为输入条件！");
						}
					},

					getFormItems : function() {
						var page = this;
						var btnTexts = [ '=', '!=', '>', '<', '>=', '<=', '+',
								'-', '*', '\/', '(', ')', '||', '&&' ];
						var btnItems = [];
						for ( var i = 0; i < btnTexts.length; i++) {
							btnItems.push({
								text : btnTexts[i],
								name : btnTexts[i],
								handler : function(btn) {
									page.cbtnClick2(btn);
								}
							});
						}
						this.propertiesFields = Ext.create("Ext.form.FieldSet",
								{
									xtype : 'fieldset',
									collapsible : true,
									title : '表单属性',
									defaults : {
										xtype : 'button',
										margin : '5 3 5 3'
									},
									bodyPadding : '5 5 0',
									columnWidth : 1,
									items : btnItems
								});
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
						}, this.propertiesFields, {
							xtype : 'widgetRadioGroup',
							fieldLabel : '条件类型',
							name : 'conditionType',
							allowBlank : false,
							data : [ {
								id : '0',
								text : '输入条件'
							}, {
								id : '1',
								text : '手动选择步骤'
							} ],
							columnWidth : 1,
							listeners : {
								change : function(field, newValue, oldValue) {
									if (newValue.conditionType == "0") {
										field.nextSibling().setDisabled(false);
									} else {
										field.nextSibling().setDisabled(true);
										field.nextSibling().setValue('');
									}
								}
							}
						}, {
							fieldLabel : '条件',
							xtype : 'textarea',
							name : 'condition',
							columnWidth : 1
						} ];
					}
				});