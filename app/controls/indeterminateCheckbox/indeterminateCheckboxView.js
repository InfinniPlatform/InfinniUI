/**
 * @class IndeterminateCheckboxView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var IndeterminateCheckboxView = ControlView.extend(/** @lends IndeterminateCheckboxView.prototype */ _.extend({}, editorBaseViewMixin, {

	template: InfinniUI.Template["controls/indeterminateCheckbox/template/indeterminateCheckbox.tpl.html"],

	UI: _.extend({}, editorBaseViewMixin.UI, {
		text: '.indeterminateCheckbox-label',
		input: 'input'
	}),

	events: {
		'click input': 'onClickHandler'
	},

	initHandlersForProperties: function(){
		ControlView.prototype.initHandlersForProperties.call(this);
		editorBaseViewMixin.initHandlersForProperties.call(this);
	},

	updateProperties: function(){
		ControlView.prototype.updateProperties.call(this);
		editorBaseViewMixin.updateProperties.call(this);
	},

	updateFocusable: function () {
		var focusable = this.model.get('focusable');

		if (!focusable) {
			this.ui.input.attr('tabindex', -1);
		} else {
			this.ui.input.removeAttr('tabindex');
		}
	},

	updateText: function () {
		var text = this.model.get('text');

		this.ui.text.text(text ? text : '');
	},

	updateEnabled: function () {
		ControlView.prototype.updateEnabled.call(this);
		var enabled = this.model.get('enabled');
		this.ui.input.prop('disabled', !enabled);
	},

	render: function () {
		this.prerenderingActions();
		this.renderTemplate(this.template);
		this.updateProperties();

		this.trigger('render');
		this.postrenderingActions();
		return this;
	},

	onClickHandler: function () {
		var model = this.model;

		var enabled = model.get('enabled');
		if (enabled) {
			var newValue = model.get('value');
			newValue = newValue === 'indeterminate' ? 'unchecked' : newValue === 'unchecked' ? 'checked' : 'unchecked';
			model.set('value', newValue);
		}
	},

	updateValue: function () {
		var value = this.model.get('value');
		if( value === 'checked' ) {
			this.ui.input.prop('indeterminate', false);
			this.ui.input.prop('checked', true);
		} else if( value === 'unchecked' ) {
			this.ui.input.prop('indeterminate', false);
			this.ui.input.prop('checked', false);
		} else if( value === 'indeterminate' ) {
			this.ui.input.prop('checked', false);
			this.ui.input.prop('indeterminate', true);
		}

	},

	setFocus: function () {
		this.ui.input.focus();
	}
}));
