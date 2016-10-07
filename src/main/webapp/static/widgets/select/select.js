define(["jquery","Dialog"], function($,Dialog) {
	$.cc = $.cc || {};
	//下拉树
	$.cc.selectTree = {
		render : function(span, config) {
			$.cc.fn.renderSelect(span, config, {
				openurl : contextPath+'/systools/treeselect'
			});
			span.setValue(config.value || '');
		},
		getValue : function(span, config) {
			return $.cc.fn.getIdTextValue(span, config);
		},
		setValue : function(span, config, value) {
			$.cc.fn.setIdTextValue(span, config, value);
		}
	}
	
});