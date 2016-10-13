define(["jquery"], function($) {
	$.cc = $.cc || {};

$.cc.radio = {
	render : function(span, config) {
		span.css('display', 'inline-block');
		span.empty();
		var name = config.name || $.cc.getUUID();
		var validate = $.cc.validation.getValidate(config);
		if (config.data) {
			var dataList = config.data;
			for (var i = 0; i < dataList.length; i++) {
				var data = dataList[i];

				var checked = config.defaultValue == data.id ? 'checked' : '';

				var input = $('<input ' + checked + ' type="radio" id="' + name
						+ '_' + i + '" name="' + name + '" value="' + data.id
						+ '" />');
				var label = $('<label for="' + name + '_' + i + '">'
						+ data.text + '</label>');
				input.click(function(result) {
					if (config.onChange) {
						config.onChange(result.currentTarget.value);
					}
				});
				if (validate) {
					input.addClass(validate + ' radio');
				}
				span.append(input).append(label).append('<span>&nbsp;</span>');
			}
		}
	},
	getValue : function(span, config) {
		var value = span.find('input:radio:checked').val();
		return value;
	},
	setValue : function(span, config, value) {
		if (config.onChange) {
			config.onChange(value);
		}
		span.find("input[type=radio]").prop("checked", false);
		var input = span.find("input[type=radio][value=" + value + "]");
		input.prop("checked", true);
		span.setConfig({
			text : input.next('label').html()
		});
	},
	disabled : function(span) {
		span.find('input').attr('disabled', true);
	},
	undisabled : function(span) {
		span.find('input').removeAttr('disabled');
	}
}
return $;
});