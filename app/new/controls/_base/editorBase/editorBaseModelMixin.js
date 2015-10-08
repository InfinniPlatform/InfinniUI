var editorBaseModelMixin = {

    defaults_editorBaseModel: {
        value: null,
        hintText: null,
        errorText: null,
        warningText: null
    },

    initialize_editorBaseModel: function(){
       this.eventManager = new EventManager();
        this.isInited = true;
    },

    _setValue: function(value, options) {
        var
            oldValue = this.get('value'),
            message = {
                oldValue: oldValue,
                newValue: value
            };

        if (value === oldValue) {
            return;
        }

        if(this.isInited){
            if (this.eventManager.trigger('onValueChanging', message)) {
                ContainerModel.prototype.set.call(this, 'value', value, options || {});
                this.trigger('onValueChanged', message);
            }
        }else{
            ContainerModel.prototype.set.call(this, 'value', value, options || {});
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
            return ContainerModel.prototype.set.call(this, attributes, options);
        }

        return false;
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
