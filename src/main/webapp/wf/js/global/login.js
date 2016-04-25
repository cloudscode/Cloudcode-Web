var Login = {
	orgChange : function() {
		var organizationList = static_var.currOrg;
		if (organizationList.length < 1 || organizationList.length == null) {
		} else {
			var resultwin = ExtUtil.open('com.hh.usersystem.org.OrgChange', {});
		}
	},
	init : function(param) {
		Login.uuid = UUID.getUUID();
		var form = Ext.create('Ext.form.Panel', {
					layout : 'absolute',
					url : 'system-login-login',
					defaultType : 'textfield',
					border : false,
					items : [{
								name : 'jump',
								value : param.jump,
								hidden : true
							}, {
								fieldLabel : '用户名',
								msgTarget : 'side',
								allowBlank : false,
								width : 250,
								x : 5,
								y : 5,
								name : 'xtYh.vdlzh',
								value : userName
							}, {
								fieldLabel : '密码',
								x : 5,
								y : 35,
								width : 250,
								inputType : 'password',
								name : 'xtYh.vmm',
								value : password
							}, {
								fieldLabel : 'cookie',
								inputType : 'cookie',
								name : 'cookie',
								value : cookie,
								hidden : true
							}]
				});

		var win = Ext.create('Ext.window.Window', {
					title : '用户登录',
					id : Login.uuid,
					width : 280,
					height : exttheme == 'ext-theme-neptune' ? 150 : 130,
					modal : !param.jump,
					layout : 'fit',
					plain : true,
					// modal : true,
					items : form,
					buttons : [{
						text : '登录',
						handler : function() {
							if (form.getForm().isValid()) {
								Doing.hidden(false);
								form.getForm().submit({
									success : function(form, action, options) {
										Doing.hidden(true);
										var result = Request
												.success(action.result.returnModel);
										if (result == 0) {
											Login.close();
										}
									},
									failure : function(form, action, options) {
										Doing.hidden(true);
										Request.error(action.result);
									}
								});
							}
						}
					}]
				});
		win.on('deactivate', function() {
					this.setZIndex(999999);
				})
		return win;
	},
	show : function(param) {
		var win = Ext.getCmp(Login.uuid);
		if (win == null) {
			win = Login.init(param);
		}
		win.show();
	},
	close : function() {
		Ext.getCmp(Login.uuid).close();
	}
}
