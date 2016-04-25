Ext.define('com.hh.base.BasePanel', {
			extend : 'Ext.panel.Panel',
			region : 'center',
			layout : 'border',
			border : false
		});

Ext.define('com.hh.base.BaseServicePanel', {
			extend : 'Ext.panel.Panel',
			constructor : function(config) {
				this.config = config || {};
				this.callParent(arguments);
				if (!this.panelTitle) {
					this.panelTitle = this.title;
				}
				this.on("render", function() {
							Doing.hidden(true);
						}, this);
			},
			padding : '1',
			icon : '/hhcommon/images/extjsico/bogus.png',
			layout : 'border',
			border : false,
			closePage : function(type) {
				if (this.up('window') != null) {
					this.up('window').close();
				} else {
					this.close();
				}
				if (type != 'cancel') {
					if (this.config.callbackRefresh) {
						this.config.callbackRefresh();
					}
				}
			}
		});