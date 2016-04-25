Ext.QuickTips.init();
var ExtStore = {
	getGridStoreProxy : function(url) {
		return {
			type : 'ajax',
			url : url,
			reader : {
				type : 'json',
				root : 'items',
				totalProperty : 'total'
			}
		};
	},
	getGridStoreProxyByObject : function(obj) {
		var proxy = {
			type : 'ajax',
			reader : {
				type : 'json',
				root : 'items',
				totalProperty : 'total'
			}
		};
		Ext.apply(proxy, obj);
		return proxy;
	},
	getDataStoreProxy : function(url, extraParams) {
		return {
			type : 'ajax',
			url : url,
			extraParams : extraParams
		};
	},
	getDataStore : function(object) {
		var proxy = ExtStore.getGridStoreProxyByObject({
					url : object.url,
					extraParams : object.extraParams
				});
		return Ext.create('com.hh.base.BaseDataStore', {
					pageSize : object.pageSize
							? object.pageSize
							: static_var.pageSize,
					fields : object.fields,
					proxy : proxy
				});
	}
}

var GridPanel = {
	getSex : function() {
		return function(value) {
			return (value == 1 ? '男' : '女')
					+ '<img src="/hhcommon/opensource/ext/shared/icons/fam/'
					+ (value == 1 ? 'user' : 'user_female')
					+ '.gif" />&nbsp;&nbsp;';
		};
	},
	getBool : function() {
		return function(value) {
			if (value == 1) {
				return '<font color=green>是</font>'
			} else {
				return '<font color=red>否</font>'
			}
		};
	},
	deleteByGrid : function(grid, url) {
		var records = grid.getSelectionModel().getSelection();
		if (Util.isNull(records)) {
			ExtFrame.info("请选中要删除的数据！");
		} else {
			var strids = Util.recordsToStrByKey(records, "id");
			GridPanel.deleteByIds(strids, grid, url);
		}
	},
	deleteByRecords : function(records, grid, url) {
		if (Util.isNull(records)) {
			ExtFrame.info("请选中要删除的数据！");
		} else {
			var strids = Util.recordsToStrByKey(records, "id");
			GridPanel.deleteByIds(strids, grid, url);
		}
	},
	deleteByIds : function(strids, grid, url) {
		if (Util.isNull(strids)) {
			return;
		}
		var result = Ext.Msg.confirm('请确认',
				'<span style="color:red"><b>提示:</b>您确认要删除信息吗？,请慎重...</span>',
				function(btn) {
					if (btn == 'yes') {
						Request.synRequestObject(url, {
									ids : strids
								});
						grid.getStore().load();
					}
				});
	},
	getDataAndHeadField : function(grid, columns) {
		var store = grid.getStore();
		var recordCount = store.getCount();

		var headList = '';
		var fieldList = '';
		var dataList = [];
		for (var i = 0; i < columns.length; i++) {
			if (!Util.isNull(columns[i].dataIndex) && !columns[i].hidden) {
				headList += columns[i].text + ",";
				fieldList += columns[i].dataIndex + ",";
			}
		}
		if (headList != '') {
			headList.substr(0, headList.length - 1);
		}
		if (fieldList != '') {
			fieldList.substr(0, fieldList.length - 1);
		}
		for (var i = 0; i < recordCount; i++) {
			var r = store.getAt(i);
			var data = {};
			for (var j = 0; j < columns.length; j++) {
				if (!Util.isNull(columns[j].dataIndex) && !columns[j].hidden) {
					var value = '';
					if (columns[j].renderer != null) {
						value = columns[j]
								.renderer(r.data[columns[j].dataIndex]);
					} else {
						value = r.data[columns[j].dataIndex];
					}
					data[columns[j].dataIndex] = value;
				}
			}
			dataList.push(data);
		}
		return {
			dataList : dataList,
			fieldNames : fieldList,
			headNames : headList
		};
	},
	getTableHTML : function(grid, columns, title) {
		var tableStr = '<table width="100%" border=1 cellspacing="0">';
		tableStr += '<caption><h2>' + title + '</h2><br/></caption>';
		tableStr = tableStr + '<tr><td><strong>序号</strong></td>';
		for (var i = 0; i < columns.length; i++) {
			if (!Util.isNull(columns[i].dataIndex) && !columns[i].hidden) {
				tableStr = tableStr + '<td><strong>' + columns[i].text
						+ '</strong></td>';
			}
		}
		tableStr = tableStr + '</tr>';
		var store = grid.getStore();
		var recordCount = store.getCount();
		for (var i = 0; i < recordCount; i++) {
			var r = store.getAt(i);
			tableStr = tableStr + '<tr><td>' + (i + 1) + '</td>';
			for (var j = 0; j < columns.length; j++) {
				if (!Util.isNull(columns[j].dataIndex) && !columns[j].hidden) {
					var value = '';
					if (columns[j].renderer != null) {
						value = columns[j]
								.renderer(r.data[columns[j].dataIndex]);
					} else {
						value = r.data[columns[j].dataIndex];
					}
					tableStr = tableStr + '<td>' + value + '</td>';
				}
			}
			tableStr = tableStr + '</tr>';
		}
		tableStr = tableStr + '</table>';
		return tableStr;
	},
	printPage : function(grid, columns, title, type) {
		var html = GridPanel.getTableHTML(grid, columns, title);

		var form = document.getElementById('system_open_page_form');
		form.target = '_blank';
		form.action = 'jsp/printer.jsp';

		var params = {
			html : html,
			type : type
		};
		document.getElementById('params').value = Ext.encode(params);
		form.submit();
	}
}

var FormPanel = {
	submit : function(formPanel, callbackObject) {
		if (formPanel.getForm().isValid()) {
			Doing.hidden(false);
			formPanel.getForm().submit({
				success : function(form, action, options) {
					if (callbackObject == null) {
						var result = Request.success(action.result.returnModel);
						if (result == 0) {
							FormPanel
									.setValues(formPanel, action.result.object);
						}
					} else {
						if (callbackObject.callback != null) {
							callbackObject.callback(action.result);
						} else if (callbackObject.afcallback) {
							var result = Request
									.success(action.result.returnModel);
							if (result == 0) {
								FormPanel.setValues(formPanel,
										action.result.object);
							}
							var afcallbackparam = {};
							if (action.result != null) {
								afcallbackparam = action.result;
							}
							afcallbackparam.isSuccess = result == 0;
							callbackObject.afcallback(afcallbackparam);
						} else {
							callbackObject(action.result);
						}
					}
					Doing.hidden(true);
				},
				failure : function(form, action, options) {
						if (callbackObject == null) {
						var result = Request.success(action.result.returnModel);
						if (result == 0) {
							FormPanel
									.setValues(formPanel, action.result.object);
						}
					} else {
						if (callbackObject.callback != null) {
							callbackObject.callback(action.result);
						} else if (callbackObject.afcallback) {
							var result = Request
									.success(action.result.returnModel);
							if (result == 0) {
								FormPanel.setValues(formPanel,
										action.result.object);
							}
							var afcallbackparam = {};
							if (action.result != null) {
								afcallbackparam = action.result;
							}
							afcallbackparam.isSuccess = result == 0;
							callbackObject.afcallback(afcallbackparam);
						} else {
							callbackObject(action.result);
						}
					}
					Doing.hidden(true);
				}
			});
		} else {
			ExtFrame.msg("数据验证失败！");
		}
	},
	setValues : function(form, object) {
		if (object != null) {
			form.getForm().setValues(object);
		}
	}
}

var Desktop = {
	onLogout : function() {
		var result = Ext.Msg.confirm('退出', '您确定要退出系统吗?', function(btn) {
					if (btn == 'yes') {
						Request.href("usersystem-login-logout");
					}
				});
	},
	changePassword : function() {
		ExtUtil.open('com.hh.usersystem.user.ChangePassword', {
					objectId : static_var.loginuser.id
				});
	},
	changeOrg : function() {
		ExtUtil.open('com.hh.usersystem.org.OrgChange', {}, {
					closable : false,
					maximizable : false,
					minimizable : false
				});
	},
	editUser : function() {
		ExtUtil.open('com.hh.usersystem.user.UserEdit', {
					title : '修改个人信息',
					objectId : static_var.loginuser.id
				});
	},
	onAgainLogin : function() {
		Login.show({
					jump : true
				});
	},
	onOpenMainMessage : function() {
		Desktop.openWindow("com.hh.message.main.MainMessageWindow", {
					openType : 1,
					vsj : 'com.hh.message.main.MainMessageWindow'
				}, {
					width : 300,
					x : Browser.getWidth() - 400
				});
	},
	onTheme : function() {
		ExtUtil.create('com.hh.system.desktop.Theme').show();
	},
	updateDesktop : function(desktop) {
		Doing.hidden(false);
		Request.href('system-login-updateDesktopType?desktop=' + desktop);
	},
	addWindow : function(win) {
		// var me = Ext.getCmp('system_main_desktop');
		if (myDesktopApp) {
			var me = myDesktopApp.desktop;
			me.windows.add(win);

			win.taskButton = me.taskbar.addTaskButton(win);
			win.animateTarget = win.taskButton.el;

			win.on({
						activate : me.updateActiveWindow,
						beforeshow : me.updateActiveWindow,
						deactivate : me.updateActiveWindow,
						minimize : me.minimizeWindow,
						destroy : me.onWindowClose,
						scope : me
					});

			win.on({
						boxready : function() {
							win.dd.xTickSize = me.xTickSize;
							win.dd.yTickSize = me.yTickSize;

							if (win.resizer) {
								win.resizer.widthIncrement = me.xTickSize;
								win.resizer.heightIncrement = me.yTickSize;
							}
						},
						single : true
					});

			// replace normal window close w/fadeOut animation:
			win.doClose = function() {
				win.doClose = Ext.emptyFn; // dblclick can call again...
				win.el.disableShadow();
				win.el.fadeOut({
							listeners : {
								afteranimate : function() {
									win.destroy();
									delete win;
								}
							}
						});
			};
		}
	},
	openWindow : function(classJs, params, winParam) {
		try {
			if (static_var.openType == 2 && params.openType != 1) {
				Util.openBrowser(params);
				return;
			}

			if (params.id == null || params.id == '') {
				params.id = classJs.replace(/\./g, '');
			}
			params.id = "panel" + params.id;
			if (Ext.getCmp(params.id)) {
				Ext.getCmp(params.id).up('window').show();
				return;
			}
			if (classJs == null || classJs == '') {
				ExtFrame.error('事件未注册！');
				return;
			}
			Doing.hidden(false);
			$import(classJs);
			if (params.params) {
				Ext.apply(params, Ext.decode(params.params));
			}
			var panel = ExtUtil.create(classJs, params);
			var win = ExtUtil.openPanel(panel, Ext.apply(winParam, {
								id : null
							}));
			if (params.addWindow != false) {
				Desktop.addWindow(win);
			}
			return win;
		} catch (theException) {
			ExtFrame.error('功能注册失败：' + theException.message);
		}
	}
}

var TreeUtil = {
	selectParentNode : function(node) {
		if (node.parentNode != null) {
			node.parentNode.set('checked', true);
			TreeUtil.selectParentNode(node.parentNode);
		}
	},
	selectChildNodes : function(node, check) {
		var childNodes = node.childNodes;
		if (childNodes != null) {
			for (var i = 0; i < childNodes.length; i++) {
				childNodes[i].set('checked', check);
				TreeUtil.selectChildNodes(childNodes[i], check);
			}
		}
	},
	isSelectParentNode : function(node) {
		if (node.parentNode != null) {
			var check = node.parentNode.get("checked");
			if (check == true) {
				TreeUtil.isSelectParentNode(node.parentNode);
			} else {
				if (node.parentNode.get("id") == 'root') {
					return true;
				} else {
					return false;
				}
			}
		}
	}
}
