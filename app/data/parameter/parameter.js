function Parameter(){

    var name;
    var _value;
    var _bindings = [];

    var notifyOnValueChanged = function () {
        for(var i = 0; i < onValueChangedHandlers.length; i++){
            //Уведомление от DataBinding об изменившемся значении
            onValueChangedHandlers[i](null, _value);
        }
    };


    /**
     * @description Уведомить PropertyBinding об изменении значения
     */
    var notifyParameterBinding = function () {
        for (var i = 0, ln = _bindings.length; i < ln; i = i + 1) {
            _bindings[i].propertyValueChanged(_value);
        }
    };

    this.getName = function(){
        return name;
    };

    this.setName = function(value){
        name = value;
    };

    this.getValue = function() {
        return _value;
    };

    /**
     * @description Установка значения из источника данных
     * @param value
     */
    this.setValue = function(value){
        if (_.isEqual(value, _value)) {
            return;
        }
        _value = value;
        notifyOnValueChanged();
        notifyParameterBinding();
    };

    /**
     *
     * @param {ParameterBinding} binding
     */
    this.addDataBinding = function (binding) {
        if (typeof binding === 'undefined' || binding === null) {
            return;
        }
        //Подписка на изменение значения в элементе
        binding.onSetPropertyValue(onSetPropertyValueHandler);
        //Установка текущего значения
        binding.propertyValueChanged(this.getValue());
        _bindings.push(binding);
    };

    var onValueChangedHandlers = [];

    this.onValueChanged = function(handler) {
        onValueChangedHandlers.push(handler);
    };

    /**
     * @description Обработчик изменения значения в элементе.
     * Устанавливает значение в параметре
     * @param context
     * @param args
     */
    var onSetPropertyValueHandler = function (context, args) {
        var propertyName = args.property;
        var propertyValue = args.value;

        if (propertyName !== undefined && propertyName !== null) {
            InfinniUI.ObjectUtils.setPropertyValue(_value, propertyName, propertyValue);
        } else {
            _value = propertyValue;
        }

        //@TODO Сгенерировать событие для уведомления об изменении значения параметра
    }
}
