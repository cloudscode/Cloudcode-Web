define(["jquery"], function($) {
	$.cc = $.cc || {};
	$.cc.ckeditor = {
			render : function(span, config) {
				span.empty();
				var $input = $('<textarea   />');
				$.cc.fn.setAttr(span, $input, config);
				if (config.name && config.hidden != true) {
					$.cc.property.execLoad[config.name] = function() {
						if ($('[name=' + config.name + ']').length > 0
								&& span.find('[type=text_span]').length == 0) {
							CKEDITOR.replace(config.name, {
								// toolbar : 'Basic',
								height : config.height || 500,
								toolbar : [ {
									name : 'document',
									items : config.toolbar
											|| [ 'Source', 'NewPage', 'Maximize',
													'Format', 'Font', 'FontSize',
													'Styles', 'Cut', 'Copy', 'Paste',
													'PasteText', 'PasteFromWord', '-',
													'Undo', 'Redo', 'TextColor',
													'BGColor', 'Find', 'Replace', '-',
													'SelectAll', '-', 'SpellChecker',
													'Scayt', 'Bold', 'Italic',
													'Underline', 'Strike', 'Subscript',
													'Superscript', '-', 'RemoveFormat',
													'NumberedList', 'BulletedList',
													'-', 'Outdent', 'Indent', '-',
													'Blockquote', 'CreateDiv', '-',
													'JustifyLeft', 'JustifyCenter',
													'JustifyRight', 'JustifyBlock',
													'-', 'Link', 'Unlink', 'Table',
													'HorizontalRule', 'Smiley',
													'SpecialChar' ]
								} ]
							// customConfig :
							// '/custom/ckeditor_config.js'
							});
							if (config.nheight) {
								CKEDITOR.instances[config.name].on("instanceReady",
										function() {
											$.cc
													.nheight(
															span.find('.cke_contents'),
															config.nheight,
															config.mheight || 0);
										});
							}
							if (config.bottom == 'hidden') {
								CKEDITOR.instances[config.name].on("instanceReady",
										function() {
											span.find('.cke_bottom').hide();
										});
							}
						}
					};
				}
				span.append($input);
				if($.cc.property){
					for ( var p in $.cc.property.execLoad) {
						$.cc.property.execLoad[p]();
					}
				}
			},
			getValue : function(span, config) {
				var value = '';
				if (CKEDITOR.instances[config.name]) {
					value = CKEDITOR.instances[config.name].getData();
				} else {
					value = span.find('textarea').val();
				}
				return value;
			},
			setValue : function(span, config, value) {
				if (CKEDITOR.instances[config.name]) {
					span.find('textarea').val(value);
					CKEDITOR.instances[config.name].setData(value);
				} else {
					span.find('textarea').val(value);
				}
			},
			toView : function(span, config) {
				if (CKEDITOR.instances[config.name]) {
					CKEDITOR.instances[config.name].on("instanceReady", function() {
						span.children().hide();
						span.append('<span type="text_span">'
								+ (span.data('text') || '') + '</span>');
					});
				} else {
					span.children().hide();
					span.append('<span type="text_span">' + (span.data('text') || '')
							+ '</span>');
				}
			}
		};
	
	return $;
});