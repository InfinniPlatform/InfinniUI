/**
 * @param parent
 * @augments Element
 * @constructor
 */
function Button(parent, viewMode) {
	_.superClass(Button, this, parent, viewMode);
	this.buttonInit();
}

_.inherit(Button, Element);

_.extend(Button.prototype, {

	createControl: function (viewMode) {
		return new ButtonControl(viewMode);
	},

	setType: function(type) {
		this.control.setType(type);
	},

	getType: function() {
		return this.control.getType();
	}

}, buttonMixin);
