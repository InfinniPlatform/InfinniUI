function editorBaseModelMixin() {

    //@TODO Добавить в базовый класс ControlModel?
    var eventManager = new EventManager();

    this.setValue = function (value) {
        var
            oldValue = this.get('value'),
            message = {
                value: value
            };

        if (value === oldValue) {
            return;
        }

        if (eventManager.trigger('onValueChanging', message)) {
            this.set('value', message.value);
            this.trigger('onValueChanged', message);
        }
    };


    this.getValue = function () {
        return this.get('value');
    };

    this.onValueChanging = function (handler) {
        eventManager.on('onValueChanging', handler);
    };

    this.onValueChanged = function (handler) {
        this.on('onValueChanged', handler);
    };

}
