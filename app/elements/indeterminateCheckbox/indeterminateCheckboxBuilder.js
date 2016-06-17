/**
 *
 * @constructor
 * @augments ElementBuilder
 */
function IndeterminateCheckboxBuilder() {
	_.superClass(IndeterminateCheckboxBuilder, this);
	this.initialize_editorBaseBuilder();
}

_.inherit(IndeterminateCheckboxBuilder, ElementBuilder);


_.extend(IndeterminateCheckboxBuilder.prototype, {
	createElement: function (params) {
		return new IndeterminateCheckbox(params.parent);
	},

	applyMetadata: function (params) {
		ElementBuilder.prototype.applyMetadata.call(this, params);
		this.applyMetadata_editorBaseBuilder(params);
	}

}, editorBaseBuilderMixin);

