define(["jquery"], function($) {
	$.cc = $.cc || {};
	$.cc.textarea = {
			render : function(span, config) {
				span.empty();
				var $input = $('<textarea   />');
				$.cc.fn.setAttr(span, $input, config);
				if (config.height) {
					$input.css('height', config.height);
				}
				if (config.blur) {
					$input.blur(function() {
						if ($.isFunction(config.blur)) {
							config.blur();
						} else {
							eval(config.blur + '()');
						}
					});
				}

				span.append($input);
			},
			getValue : function(span, config) {
				var value = span.find('textarea').val();
				return value;
			},
			setValue : function(span, config, value) {
				span.find('textarea').val(value);
			}
		};
	return $;
});