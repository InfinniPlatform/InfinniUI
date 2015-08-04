function editorBaseControlMixin() {

    this.setValue = function (value) {
        this.controlModel.setValue(value);
    };

    this.getValue = function () {
        return this.controlModel.getValue();
    };

    this.onValueChanging = function (handler) {
        this.controlModel.onValueChanging(handler);
    };

    this.onValueChanged = function (handler) {
        this.controlModel.onValueChanged(handler);
    };
}