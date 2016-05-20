/**
 *
 * @param parent
 * @constructor
 * @augment Element
 */
function IndeterminateCheckbox(parent) {
	_.superClass(IndeterminateCheckbox, this, parent);
	this.initialize_editorBase();
}

_.inherit(IndeterminateCheckbox, Element);


_.extend(IndeterminateCheckbox.prototype, {

	createControl: function (parent) {
		return new IndeterminateCheckboxControl(parent);
	}

}, editorBaseMixin);
