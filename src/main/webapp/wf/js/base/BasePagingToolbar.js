Ext.define('com.hh.base.BasePagingToolbar', {
	extend : 'Ext.PagingToolbar',
	displayInfo : true,
	constructor : function(config) {
		this.config = config || {};
		this.superclass.constructor.call(this, this.config);
	},
	items : [{
		xtype : 'numberfield',
		fieldLabel : '每页显示',
		labelWidth : 60,
		width : 150,
		listeners : {
			blur : function(field) {
				if (field.isValid()) {
					var pagesize = Util.isNull(field.getValue())
							? static_var.pageSize
							: field.getValue();
					this.up("toolbar").pageSize = pagesize;
					this.up("toolbar").store.pageSize = pagesize;
				}
			}
		}
	}, {
		iconCls : 'view',
		tooltip : '打印预览',
		handler : function(grid, rowIndex, colIndex) {
			var page = this.up('toolbar').page;
			GridPanel.printPage(page.grid, page.getGridColumns(),
					page.panelTitle);
		}
	}, {
		iconCls : 'print',
		tooltip : '打印',
		handler : function(grid, rowIndex, colIndex) {
			var page = this.up('toolbar').page;
			GridPanel.printPage(page.grid, page.getGridColumns(),
					page.panelTitle, 'print');
		}
	}, {
		iconCls : 'excel',
		tooltip : '导出EXCEL',
		handler : function(grid, rowIndex, colIndex) {
			var page = this.up('toolbar').page;
			var params = GridPanel.getDataAndHeadField(page.grid, page
							.getGridColumns());
			var form = document.getElementById('system_open_page_form');
			form.target = '';
			form.action = 'system-excel';
			var params = {
				title : page.panelTitle,
				dataListString : params.dataList,
				headNames : params.headNames,
				fieldNames : params.fieldNames
			};
			document.getElementById('params').value = Ext.encode(params);
			form.submit();
		}
	}, {
		iconCls : 'word',
		tooltip : '导出WORD',
		handler : function(grid, rowIndex, colIndex) {
			var page = this.up('toolbar').page;
			var form = document.getElementById('system_open_page_form');
			form.target = '';
			form.action = 'system-word';
			var params = {
				title : page.panelTitle,
				dataListString : GridPanel.getTableHTML(page.grid, page.getGridColumns(),
						page.panelTitle)
			};
			document.getElementById('params').value = Ext
					.encode(params);
			form.submit();
		}
	}]
		// , plugins: Ext.create('Ext.ux.ProgressBarPager', {})
	});