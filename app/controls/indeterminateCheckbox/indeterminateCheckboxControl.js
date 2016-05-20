function IndeterminateCheckboxControl(parent) {
	_.superClass(IndeterminateCheckboxControl, this, parent);
	this.initialize_editorBaseControl();
}

_.inherit(IndeterminateCheckboxControl, Control);

_.extend(IndeterminateCheckboxControl.prototype, {

	createControlModel: function () {
		return new IndeterminateCheckboxModel();
	},

	createControlView: function (model) {
		return new IndeterminateCheckboxView({model: model});
	}

}, editorBaseControlMixin);

