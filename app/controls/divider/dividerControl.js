/**
 *
 * @param parent
 * @constructor
 * @arguments Control
 */
function DividerControl(parent) {
	_.superClass(DividerControl, this, parent);
}

_.inherit(DividerControl, Control);

_.extend(DividerControl.prototype, {

	createControlModel: function () {
		return new DividerModel();
	},

	createControlView: function (model) {
		return new DividerView({model: model});
	}
});

