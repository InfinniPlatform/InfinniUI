/**
 * @class IndeterminateCheckboxView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var IndeterminateCheckboxView = CheckBoxView.extend({

	className: 'pl-indeterminate-checkbox',

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

	}
});
