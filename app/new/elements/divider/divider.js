/**
 *
 * @param parent
 * @constructor
 * @argument Element
 */
function Divider(parent) {
	_.superClass(Divider, this, parent);
}

_.inherit(Divider, Element);

Divider.prototype.createControl = function (parent) {
	return new DividerControl(parent);
}
