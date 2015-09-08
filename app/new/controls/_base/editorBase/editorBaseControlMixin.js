function editorBaseControlMixin() {

    this.setValue = function (value) {
        this.controlModel.set('value', value);
    };

    this.getValue = function () {
        return this.controlModel.get('value');
    };

    this.onValueChanging = function (handler) {
        this.controlModel.onValueChanging(handler);
    };

    this.onValueChanged = function (handler) {
        this.controlModel.onValueChanged(handler);
    };
}