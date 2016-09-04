//define("cc/text",
//        ["jquery"],
//        function(text) {
//	 console.log( text) // OK
//       }
//    );

define(["jquery"], function($) {
$.cc.text ={
	render : function(span, config) {
		span.empty();
		var $input = $('<input type="text"  />');
		if (config.data && config.data.length > 0) {
			$input.autocomplete({
				autoFocus : true,
				source : config.data,
				minLength : 0
			});
			$input.bind("click", function() {
				var widget = $(this).autocomplete("widget");
				if (!widget.html()) {
					$(this).autocomplete("search", "");
					widget.css({
						'max-height' : '135px',
						'overflow-y' : 'auto',
						'overflow-x' : 'hidden'
					});
				}
				widget.show();
			});
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
		if (config.enter) {
			$input.keydown(function(e) {
				if (e.keyCode == 13) {
					if ($.isFunction(config.enter)) {
						config.enter();
					} else {
						eval(config.enter + '()');
					}
				}
			});
		}
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
		if (config.integer) {
			if ($.isNumeric(value)) {
				value = parseInt(value);
			} else {
				value = 0;
			}
		}
		return value;
	},
	setValue : function(span, config, value) {
		span.find('input').data('watermark_value', '0');
		span.find('input').val(value);
	}
}
return $.cc.text;
});