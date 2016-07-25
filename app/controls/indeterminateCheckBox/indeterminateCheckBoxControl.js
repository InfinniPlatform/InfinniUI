function IndeterminateCheckBoxControl(parent) {
	_.superClass(IndeterminateCheckBoxControl, this, parent);
	this.initialize_editorBaseControl();
}

_.inherit(IndeterminateCheckBoxControl, CheckBoxControl);

_.extend(IndeterminateCheckBoxControl.prototype, {

	createControlModel: function () {
		return new IndeterminateCheckBoxModel();
	},

	createControlView: function (model) {
		return new IndeterminateCheckBoxView({model: model});
	}

}, editorBaseControlMixin);

