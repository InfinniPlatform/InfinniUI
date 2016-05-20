var IndeterminateCheckboxModel = ControlModel.extend( _.extend({

	defaults: _.defaults({
		value: 'unchecked'
	}, ControlModel.prototype.defaults),

	initialize: function () {
		ControlModel.prototype.initialize.apply(this, arguments);
		this.initialize_editorBaseModel();
	}

}, editorBaseModelMixin));
