define(["jquery"], function($) {
	$.cc = $.cc || {};
	$.cc.button = {
			render : function(field, config) {
				field.empty();
				var $input = $("<button>"
						+ (config.text == null ? '&nbsp;' : config.text) + "</button>");
				$.cc.fn.setAttr(field, $input, config);
				field.append($input);

				var menuId = config.menuId;
				if (menuId) {
					$('#' + menuId).hide();
					$('#' + menuId).css(
							{
								'border' : '1px solid '
										+ $.cc.property.classObject.themeContent,
								'position' : 'absolute'
							});
				}

				$input.button(
						{
							disabled : config.disabled,
							text : (!(config.textHidden == true))
									&& (config.text != null && config.text != ''),
							icons : {
								primary : config.icon
							}
						}).click(function() {
					if (config.onClick) {
						config.onClick(config.params);
					}
					if (menuId) {
						$(document).one("click", function() {
							$('#' + menuId).hide();
						});
						$('#' + menuId).show().position({
							my : "right top",
							at : "right bottom",
							of : this
						});
					}
					return false;
				});
				if (config.itype == 'delete') {
					// $input.addClass('hh_red_btn');
					$input.button({
						icons : {
							primary : "hh_img_delete"
						}
					});
				} else if (config.itype == 'add') {
					// $input.addClass('hh_blue_btn');
					$input.button({
						icons : {
							primary : "hh_img_add"
						}
					});
				} else if (config.itype == 'edit') {
					// $input.addClass('hh_yellow_btn');
					$input.button({
						icons : {
							primary : "hh_img_edit"
						}
					});
				} else if (config.itype == 'refresh') {
					// $input.addClass('hh_green_btn');
					$input.button({
						icons : {
							primary : "hh_img_refresh"
						}
					});
				} else if (config.itype == 'query') {
					$input.button({
						icons : {
							primary : "hh_img_query"
						}
					});
				} else if (config.itype == 'view') {
					$input.button({
						icons : {
							primary : "hh_img_view"
						}
					});
				} else if (config.itype == 'manager') {
					$input.button({
						icons : {
							primary : "hh_img_setting"
						}
					});
				} else if (config.itype == 'save') {
					$input.button({
						icons : {
							primary : "hh_img_save"
						}
					});
				} else if (config.itype == 'close') {
					$input.button({
						icons : {
							primary : "hh_img_delete"
						}
					});
				} else if (config.itype == 'submit') {
					$input.button({
						icons : {
							primary : "hh_img_green"
						}
					});
				}

			},
			disabled : function(span) {
				span.find('button').button({
					disabled : true
				});
			},
			undisabled : function(span) {
				span.find('button').button({
					disabled : false
				});
			}
		};
	return $;
});