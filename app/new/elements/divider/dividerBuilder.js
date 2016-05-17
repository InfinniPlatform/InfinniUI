/**
 *
 * @constructor
 * @arguments DividerBuilder
 */
function DividerBuilder() {
	_.superClass(DividerBuilder, this);
}

_.inherit(DividerBuilder, ElementBuilder);

DividerBuilder.prototype.createElement = function (params) {
	return new Divider(params.parent);
};

DividerBuilder.prototype.applyMetadata = function (params) {
	ElementBuilder.prototype.applyMetadata.call(this, params);
};

