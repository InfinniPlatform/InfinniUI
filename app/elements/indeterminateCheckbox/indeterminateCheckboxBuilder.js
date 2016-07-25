/**
 *
 * @constructor
 * @augments ElementBuilder
 */
function IndeterminateCheckBoxBuilder() {
	_.superClass(IndeterminateCheckBoxBuilder, this);
	this.initialize_editorBaseBuilder();
}

_.inherit(IndeterminateCheckBoxBuilder, CheckBoxBuilder);


_.extend(IndeterminateCheckBoxBuilder.prototype, {
	createElement: function (params) {
		return new IndeterminateCheckBox(params.parent);
	}
});

