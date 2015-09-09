var editorBaseModelMixin = {

    initialize_editorBaseModel: function(){
       this.eventManager = new EventManager();
    },

    _setValue: function(value, options) {
        var
            oldValue = this.get('value'),
            message = {
                value: value
            };

        if (value === oldValue) {
            return;
        }

        if (this.eventManager.trigger('onValueChanging', message)) {
            //this.set('value', message.value, optionsValue);
            ContainerModel.prototype.set.call(this, 'value', message.value, options || {})
            this.trigger('onValueChanged', message);
        }
    },

    set: function (key, value, options) {
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
            this._setValue(attributes.value, options);
            delete attributes.value;
        }

        var hasAttributes = false;

        for (var i in attributes) {
            hasAttributes = true;
            break;
        }

        if (hasAttributes) {
            ContainerModel.prototype.set.call(this, attributes, options);
        }

        return this;

    },

    getValue: function () {
        return this.get('value');
    },

    onValueChanging: function (handler) {
        this.eventManager.on('onValueChanging', handler);
    },

    onValueChanged: function (handler) {
        this.on('onValueChanged', handler);
    }
};
