/**
 *
 * @constructor
 * @augments ElementBuilder
 */
function IndeterminateCheckboxBuilder() {
	_.superClass(IndeterminateCheckboxBuilder, this);
	this.initialize_editorBaseBuilder();
}

_.inherit(IndeterminateCheckboxBuilder, CheckBoxBuilder);


_.extend(IndeterminateCheckboxBuilder.prototype, {
	createElement: function (params) {
		return new IndeterminateCheckbox(params.parent);
	}
});

