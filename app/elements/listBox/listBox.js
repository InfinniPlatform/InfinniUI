function ListBox(parent, viewMode) {
	_.superClass(ListBox, this, parent, viewMode);
}

_.inherit(ListBox, ListEditorBase);

ListBox.prototype.createControl = function (viewMode) {
	return new ListBoxControl(viewMode);
};

ListBox.prototype.setEnabled = function (value) {
	if( _.isBoolean(value) ) {
		ListEditorBase.prototype.setEnabled.call(this, value);
		if( value ) {
			this.control.updateDisabledItem();
		} else {
			this.control.disableAll();
		}
	}
};
