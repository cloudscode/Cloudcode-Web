define(["jquery"], function($) {
	$.cc = $.cc || {};
	
	$.cc.date = {
			render : function(span, config) {
				span.empty();
				var $input = $('<input style="background:url(/cccommon/opensource/My97DatePicker/skin/datePicker.gif) no-repeat right;" type="text" >');
				var type = null;
				if (config.type == 'datetime') {
					type = 'yyyy-MM-dd HH:mm:ss';
				} else if (config.type == 'date') {
					type = 'yyyy-MM-dd';
				} else if (config.type) {
					type = config.type;
				} else {
					type = 'yyyy-MM-dd';
				}
				if (config.readonly != true) {
					$input.click(function() {
						var cfg = {
							dateFmt : type
						};
						WdatePicker(cfg);
					});
				}
				$.cc.fn.setAttr(span, $input, config);
				$input.addClass('hh_input');
				if (config.defaultValue) {
					$input.val(config.defaultValue);
				}
				span.append($input);
			},
			getValue : function(span, config) {
				var value = span.find('input').val();
				return value;
			},
			setValue : function(span, config, value) {
				if (value) {
					if (!$.cc.isDate(value)) {
						value = new Date(value);
						if (config.type == 'datetime') {
							value = $.cc.dateTimeToString(value);
						} else {
							value = $.cc.dateToString(value);
						}
					}
				}
				span.setConfig({
					value : value,
					text : value
				});
				span.find('input').val(value);
			},
			toView : function(span, config) {
				span.children().hide();
				span.append('<span type="text_span">' + (span.getValue() || '')
						+ '</span>');
			}
		}
	return $;
});