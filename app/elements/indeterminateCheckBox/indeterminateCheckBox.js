/**
 *
 * @param parent
 * @constructor
 * @augment Element
 */
function IndeterminateCheckBox(parent) {
	_.superClass(IndeterminateCheckBox, this, parent);
	this.initialize_editorBase();
}

_.inherit(IndeterminateCheckBox, CheckBox);


_.extend(IndeterminateCheckBox.prototype, {

	createControl: function (parent) {
		return new IndeterminateCheckBoxControl(parent);
	}

}, editorBaseMixin);
