define(["jquery"], function($) {
	$.cc = $.cc || {};
	$.cc.check = {
			render : function(span, config) {
				span.css('display', 'inline-block');
				span.empty();
				var name = config.name;
				var id = $.cc.getUUID();
				var checked = config.defaultValue ? 'checked' : '';
				var input = $('<input ' + checked + ' id="' + id
						+ '" type="checkbox"  name="' + name + '" />' + '<label for="'
						+ id + '">' + (config.checktext || '') + '</label>');
				span.append(input);
			},
			getValue : function(span, config) {
				if (config.num) {
					return span.find("input:checkbox").prop('checked') ? 1 : 0;
				} else {
					return span.find("input:checkbox").prop('checked') ? true : false;
				}
			},
			setValue : function(span, config, value) {
				span.find("input[type=checkbox]").prop("checked", value ? true : false);
			},
			toView : function(span, config) {
				span.children().hide();
				span.append('<span type="text_span">' + (span.getValue() ? '是' : '否')
						+ '</span>');
			}
		}
	return $;
});