define(["jquery"], function($) {
	$.cc = $.cc || {};
	$.cc.password = {
			render : function(span, config) {
				span.empty();
				var $input = $('<input type="password"  />');
				$.cc.fn.setAttr(span, $input, config);
				span.append($input);
				if (!config.value && config.defaultValue) {
					span.setValue(config.defaultValue);
				} else {
					span.setValue(config.value || '');
				}
				if (config.watermark) {
					$.cc.watermark($input, config.watermark);
				}
			},
			getValue : function(span, config) {
				if (span.find('input').data('watermark_value') == '1') {
					return '';
				}
				var value = span.find('input').val();
				return value;
			},
			setValue : function(span, config, value) {
				span.find('input').data('watermark_value', '0');
				span.find('input').val(value);
			},
			toView : function(span, config) {
				span.children().hide();
				span.append('<span type="text_span">' + ('******') + '</span>');
			}
		};
	return $;
});