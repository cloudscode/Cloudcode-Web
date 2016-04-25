Ext.override(Ext.view.AbstractView, {
			onRender : function() {
				var me = this;
				me.loadingText = "数据正在加载...";
				this.callOverridden();

				if (me.mask && Ext.isObject(me.store)) {
					me.setMaskBind(me.store);
				}
			}
		});

var Override = {
	hiddenAndReadOnly : function(initComponent) {
		return {
			initComponent : Ext.Function.createInterceptor(initComponent,
					function() {
						if (this.$className == 'Ext.form.field.Radio'
								|| this.$className == 'Ext.form.field.Checkbox') {
							return;
						}
						if (this.allowBlank === false && this.fieldLabel) {
							this.fieldLabel = '<font color=red>'
									+ this.fieldLabel + '</font>';
						}
						if (this.readOnly === true) {
							this.on('afterrender', function(p) {
										if (this.inputEl) {
											this.inputEl
													.addCls('noborderinput');
										}
									}, this);
						}
						if (this.readOnly === true && this.fieldLabel) {
							if (this.fieldLabel.indexOf("lightslategray") < 0) {
								this.fieldLabel = '<font color=lightslategray>'
										+ this.fieldLabel
										+ '</font><img src="/hhcommon/images/icons/lock/lock.png"/>';
							}
						}
					}),
			setReadOnly : function(param) {
				this.callParent(arguments);
				if (this.$className == 'Ext.form.field.Radio'
						|| this.$className == 'Ext.form.field.Checkbox') {
					return;
				}
				if (param == true) {
					if (this.fieldLabel.indexOf("lightslategray") < 0) {
						this
								.setFieldLabel('<img src="/hhcommon/images/icons/lock/lock.png"/><font color=lightslategray>'
										+ this.getFieldLabel() + '</font>');
					}
				} else {
					this
							.setFieldLabel(this
									.getFieldLabel()
									.replace(
											'<img src="/hhcommon/images/icons/lock/lock.png"/><font color=lightslategray>',
											'').replace('</font>', ''));
				}
				if (this.inputEl != null) {
					if (param == true
							&& this.inputEl.hasCls('noborderinput') == false) {
						this.inputEl.addCls('noborderinput');
					} else if (param == false) {
						this.inputEl.removeCls('noborderinput');
					}
				} else {
					if (param) {
						this.on('afterrender', function(p) {
									if (this.inputEl) {
										this.inputEl.addCls('noborderinput');
									}
								}, this);
					} else {
						this.on('afterrender', function(p) {
									if (this.inputEl) {
										this.inputEl.removeCls('noborderinput');
									}
								}, this);
					}
				}
			}

		};
	}
};
Ext
		.override(
				Ext.form.field.Base,
				Override
						.hiddenAndReadOnly(Ext.form.field.Base.prototype.initComponent));
Ext
		.override(
				Ext.form.CheckboxGroup,
				Override
						.hiddenAndReadOnly(Ext.form.CheckboxGroup.prototype.initComponent));
Ext
		.override(
				Ext.form.field.Trigger,
				Override
						.hiddenAndReadOnly(Ext.form.field.Trigger.prototype.initComponent));
Ext.override(Ext.data.TreeStore, {
			load : function() {
				var isLoad = false;
				try {
					isLoad = arguments[0].node.data.id != 'root';
				} catch (ex) {
				}
				if (this.isLoading() == false || isLoad) {
					this.callParent(arguments);
				}
			}
		});
Ext.override(Ext.data.Store, {
			load : function() {
				if (this.isLoading() == false) {
					this.callParent(arguments);
				}
			}
		});
Ext.override(Ext.tree.Panel, {
			constructor : function(config) {
				this.callParent(arguments);
				var me = this;
				this.getStore().on("beforeload", function(store) {
							me.setLoading(true, me.body);
						});
				this.getStore().on("load", function(store) {
							me.setLoading(false);
						});
			}
		});

Ext.define('Ext.form.field.DateTimer', {
			extend : 'Ext.form.field.Date',
			alias : 'widget.widgetDateTimer',
			format : 'Y年m月d日 H时i分s秒',
			showTimer : true
		});
Ext.override(Ext.picker.Date, {
	showTimer : false,
	renderTpl : [
			'<div id="{id}-innerEl" role="grid">',
			'<div role="presentation" class="{baseCls}-header">',
			'<div class="{baseCls}-prev"><a id="{id}-prevEl" href="#" role="button" title="{prevText}"></a></div>',
			'<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
			'<div class="{baseCls}-next"><a id="{id}-nextEl" href="#" role="button" title="{nextText}"></a></div>',
			'</div>',
			'<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="presentation">',
			'<thead role="presentation"><tr role="presentation">',
			'<tpl for="dayNames">',
			'<th role="columnheader" title="{.}"><span>{.:this.firstInitial}</span></th>',
			'</tpl>',
			'</tr></thead>',
			'<tbody role="presentation"><tr role="presentation">',
			'<tpl for="days">',
			'{#:this.isEndOfWeek}',
			'<td role="gridcell" id="{[Ext.id()]}">',
			'<a role="presentation" href="#" hidefocus="on" class="{parent.baseCls}-date" tabIndex="1">',
			'<em role="presentation"><span role="presentation"></span></em>',
			'</a>',
			'</td>',
			'</tpl>',
			'</tr></tbody>',
			'</table>',
			'<tpl if="showTimer">',
			'<div role="presentation" class="{baseCls}-footer"><table width=100%><tr>',
			'<td>{%this.renderhourBtn(values, out)%}<td/>',
			'<td>{%this.renderminuteBtn(values, out)%}<td/>',
			'<td>{%this.rendersecondBtn(values, out)%}<td/>',
			'</tr></table></div>',
			'</tpl>',
			'<tpl if="showToday">',
			'<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}{%this.renderqdBtn(values, out)%}</div>',
			'</tpl>', '</div>', {
				firstInitial : function(value) {
					return Ext.picker.Date.prototype.getDayInitial(value);
				},
				isEndOfWeek : function(value) {
					value--;
					var end = value % 7 === 0 && value !== 0;
					return end ? '</tr><tr role="row">' : '';
				},
				renderTodayBtn : function(values, out) {
					Ext.DomHelper.generateMarkup(values.$comp.todayBtn
									.getRenderTree(), out);
				},
				renderMonthBtn : function(values, out) {
					Ext.DomHelper.generateMarkup(values.$comp.monthBtn
									.getRenderTree(), out);
				},
				renderhourBtn : function(values, out) {
					Ext.DomHelper.generateMarkup(values.$comp.hour
									.getRenderTree(), out);
				},
				renderminuteBtn : function(values, out) {
					Ext.DomHelper.generateMarkup(values.$comp.minute
									.getRenderTree(), out);
				},
				rendersecondBtn : function(values, out) {
					Ext.DomHelper.generateMarkup(values.$comp.second
									.getRenderTree(), out);
				},
				renderqdBtn : function(values, out) {
					Ext.DomHelper.generateMarkup(values.$comp.qued
									.getRenderTree(), out);
				}
			}],
	finishRenderChildren : function() {
		var me = this;
		me.callParent();
		if (me.hour) {
			me.hour.finishRender();
		}
		if (me.minute) {
			me.minute.finishRender();
		}
		if (me.second) {
			me.second.finishRender();
		}
		if (me.qued) {
			me.qued.finishRender();
		}
	},
	onShow : function() {
		var me = this;
		me.callParent();
		if (me.showTimer == true) {
			var v = me.pickerField.getValue();
			if (v != null && typeof v == "object") {
				me.hour.setValue(v.getHours());
				me.minute.setValue(v.getMinutes());
				me.second.setValue(v.getSeconds());
			} else {
				me.hour.setValue(0);
				me.minute.setValue(0);
				me.second.setValue(0);
			}
		}
	},
	beforeRender : function() {
		var me = this;
		me.callParent();
		me.showTimer = me.pickerField.showTimer;
		if (me.showTimer == true) {
			me.hour = Ext.create('Ext.form.field.Number', {
						minValue : 0,
						maxValue : 23,
						width : 40,
						enableKeyEvents : true,
						scope : this
					});
			me.minute = Ext.create('Ext.form.field.Number', {
						fieldLabel : '&nbsp;',
						labelWidth : 10,
						minValue : 0,
						maxValue : 59,
						width : 60,
						enableKeyEvents : true,
						scope : this
					});
			me.second = Ext.create('Ext.form.field.Number', {
						fieldLabel : '&nbsp;',
						labelWidth : 10,
						minValue : 0,
						width : 60,
						maxValue : 59,
						enableKeyEvents : true,
						scope : this
					});
			me.qued = new Ext.button.Button({
						ownerCt : me,
						ownerLayout : me.getComponentLayout(),
						text : "确定",
						handler : function() {
							me.fireEvent('select', me, me.value);
							me.onSelect(me.scope || me, me, me.value);
						},
						scope : me
					});
		}
		Ext.apply(me.renderData, {
					showTimer : me.showTimer
				});
	},
	beforeDestroy : function() {
		var me = this;
		if (me.showTimer == true) {
			if (me.rendered) {
				Ext.destroy(me.hour, me.minute, me.second, me.qued);
			}
		}
		me.callParent();
	}
});

Ext.override(Ext.form.field.Date, {
			trigger1Cls : Ext.baseCSSPrefix + 'form-clear-trigger',
			trigger2Cls : Ext.baseCSSPrefix + 'form-date-trigger',
			onTrigger1Click : function() {
				this.reset();
			},
			setValue : function(value) {
				var me = this, inputEl = me.inputEl;
				if (typeof value == "string") {
					if (value != null && value != '') {
						if (value.indexOf('年') < 0) {
							value = new Date(value);
						}
					}
				}
				if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
					inputEl.removeCls(me.emptyCls);
				}
				me.callParent(arguments);
				me.applyEmptyText();
				return me;
			},
			onSelect : function(m, d) {
				var me = this;
				if (me.showTimer == true) {
					var picker = me.picker;
					var hour = picker.hour;
					var minute = picker.minute;
					var second = picker.second;
					d.setHours(hour.getValue());
					d.setMinutes(minute.getValue());
					d.setSeconds(second.getValue());
				}
				me.setValue(d);
				me.fireEvent('select', me, d);
				me.collapse();
			}
		});

Ext.override(Ext.form.field.ComboBox, {
			trigger1Cls : Ext.baseCSSPrefix + 'form-clear-trigger',
			trigger2Cls : Ext.baseCSSPrefix + 'form-arrow-trigger',
			onTrigger1Click : function() {
				this.reset();
			}
		});

Ext.override(Ext.button.Button, {
			constructor : function(config) {
				this.callParent(arguments);
				this.on("beforerender", function(field) {
							if (this.surl) {
								field
										.setDisabled(!static_var.loginuser.hhXtCzUrlList
												.inArray(this.surl));
							}
						});
			}
		});
Ext.override(Ext.grid.Panel, {
	emptyText : '<p style="text-align: center;"><span style="color:#ff0000;font-size: 20px;">没有数据可显示!</span></p>'
});
Ext.override(Ext.panel.Panel, {
			constructor : function(config) {
				if (config.title == null || config.title == '') {
					config.icon = null;
					config.iconCls = null;
				}
				this.callParent(arguments);
			}
		});

Ext.define('Ext.ux.RowExpander', {
			extend : 'Ext.grid.plugin.RowExpander'
		});