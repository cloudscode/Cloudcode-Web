define(["jquery"], function($) {
	$.cc = $.cc || {};
$.cc.checkbox = {
	render : function(span, config) {
		span.css('display', 'inline-block');
		span.empty();
		var name = config.name || $.cc.getUUID();
		var validate = $.cc.validation.getValidate(config);
		if (config.data) {
			var dataList = config.data;
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];
				var checked = '';
				if (config.defaultValue) {
					checked = config.defaultValue.split(',').inArray(data.id) ? 'checked'
							: '';
				}
				var input = $('<input ' + checked + ' type="checkbox" id="'
						+ name + '_' + i + '" name="' + name + '" value="'
						+ data.id + '" />');
				var label = $('<label for="' + name + '_' + i + '">'
						+ data.text + '</label>');
				if (validate) {
					input.addClass(validate + ' check');
				}
				span.append(input).append(label).append('<span>&nbsp;</span>');
			}
		}
	},
	getValue : function(span, config) {
		var value = '';
		span.find("input:checkbox:checked").each(function() {
			value += $(this).val() + ","
		})
		if (value != '') {
			value = value.substr(0, value.length - 1);
		}
		return value;
	},
	setValue : function(span, config, value) {
		span.find("input[type=checkbox]").prop("checked", false);
		if (value) {
			value += '';
			var values = value.split(',');
			var text = '';
			for (var i = 0; i < values.length; i++) {
				var input = span.find("input[type=checkbox][value=" + values[i]
						+ "]");
				input.prop("checked", true);
				text += input.next('label').html() + ',';
			}
			if (text != '') {
				text = text.substr(0, text.length - 1);
				span.setConfig({
					text : text
				});
			}
		}
	}
}
return $;
});