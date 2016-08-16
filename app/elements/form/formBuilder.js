/**
 *
 * @constructor
 * @augments StackPanelBuilder
 */
function FormBuilder() {
	_.superClass(FormBuilder, this);
}

_.inherit(FormBuilder, StackPanelBuilder);

_.extend(FormBuilder.prototype, {

	createElement: function (params) {
		return new Form(params.parent);
	},

	applyMetadata: function(params) {
		var element = params.element,
				metadata = params.metadata;
		StackPanelBuilder.prototype.applyMetadata.call(this, params);

		if( metadata.OnSubmit ) {
			element.onSubmit(function() {
				return new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnSubmit.Name || metadata.OnSubmit);
			});
		}

		if( metadata.Method ) {
			element.setMethod(metadata.Method);
		}

		if( metadata.Action ) {
			element.setAction(metadata.Action);
		}
	}
});
