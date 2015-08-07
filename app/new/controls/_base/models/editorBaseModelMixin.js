function editorBaseModelMixin() {

    //@TODO Добавить в базовый класс ControlModel?
    var eventManager = new EventManager();
    var model = this;
    var originalSetMethod = this.set;

    function setValue(value, options) {
        var
            oldValue = model.get('value'),
            message = {
                value: value
            };

        if (value === oldValue) {
            return;
        }

        if (eventManager.trigger('onValueChanging', message)) {
            //model.set('value', message.value, optionsValue);
            originalSetMethod.call(model, 'value', message.value, options || {})
            model.trigger('onValueChanged', message);
        }
    }

    this.set = function (key, value, options) {
        var attributes, options;
        if (key === null) {
            return this;
        }

        if (typeof key === 'object') {
            attributes = key;
            options = value;
        } else {
            (attributes = {})[key] = value;
        }

        options = options || {};

        if ('value' in attributes) {
            setValue(attributes.value, options);
            delete attributes.value;
        }

        var hasAttributes = false;

        for (var i in attributes) {
            hasAttributes = false;
            break;
        }

        if (hasAttributes) {
            originalSetMethod.call(this, attributes, options);
        }

        return this;

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
