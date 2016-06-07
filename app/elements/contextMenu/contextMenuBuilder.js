/**
 * @constructor
 * @arguments ContainerBuilder
 */
function ContextMenuBuilder() {
	_.superClass(ContextMenuBuilder, this);
}

_.inherit(ContextMenuBuilder, ContainerBuilder);

_.extend(ContextMenuBuilder.prototype, /** @lends ContextMenuBuilder.prototype */{

	createElement: function (params) {
		return new ContextMenu(params.parent);
	},

	applyMetadata: function (params) {
		ContainerBuilder.prototype.applyMetadata.call(this, params);
	}

});
