/**
 * @constructor
 * @arguments Backbone.Model
 */
var Parameter = Backbone.Model.extend({
    defaults: {
        name: null,
        view: null,
        value: undefined
    },

    initialize: function () {

    },

    onPropertyChanged: function (property, handler) {
        if (typeof property == 'function') {
            handler = property;
            this.on('onPropertyChanged', handler);
        } else {
            this.on('onPropertyChanged:' + property, handler);
        }

    },

    getName: function(){
        return this.get('name');
    },

    setName: function(newName){
        this.set('name', newName);
        this.name = newName;
    },

    getView: function(){
        return this.get('view');
    },

    getValue: function(){
        return this.getProperty('');
    },

    setValue: function(value){
        this.setProperty('', value);
    },

    getProperty: function(property){
        var value = this.get('value');

        if (property == '') {
            return value;
        } else {
            return this._nullToUndefined (InfinniUI.ObjectUtils.getPropertyValue(value, property));
        }
    },

    setProperty: function(property, value){
        var fullParameterValue = this.getValue(),
            oldValue = this.getProperty(property);

        if(value == oldValue){
            return;
        }

        if (property == '') {
            this.set('value', value);

        } else {
            InfinniUI.ObjectUtils.setPropertyValue(fullParameterValue, property, value);
        }

        this._notifyAboutPropertyChanged(property, value, oldValue);
    },

    _notifyAboutPropertyChanged: function (property, newValue, oldValue) {
        var context = this._getContext(),
            argument = {};

        argument.property = property;
        argument.newValue = newValue;
        argument.oldValue = oldValue;

        this.trigger('onPropertyChanged', context, argument);
        this.trigger('onPropertyChanged:' + property, context, argument);
    },

    _getContext: function(){
        var view = this.getView();
        if(view){
            return view.getContext();
        }else{
            return undefined;
        }
    },

    _nullToUndefined: function(val){
        if(val === null){
            return undefined;
        }else{
            return val;
        }
    }
});


//{
//
//    var _name;
//    var _value;
//    var _bindings = [];
//
//    var notifyOnValueChanged = function () {
//        for(var i = 0; i < onValueChangedHandlers.length; i++){
//            //Уведомление от DataBinding об изменившемся значении
//            onValueChangedHandlers[i](null, _value);
//        }
//    };
//
//
//    /**
//     * @description Уведомить PropertyBinding об изменении значения
//     */
//    var notifyParameterBinding = function () {
//        for (var i = 0, ln = _bindings.length; i < ln; i = i + 1) {
//            _bindings[i].propertyValueChanged(_value);
//        }
//    };
//
//    this.getName = function(){
//        return _name;
//    };
//
//    this.setName = function(value){
//        _name = value;
//    };
//
//    this.getValue = function() {
//        return _value;
//    };
//
//    /**
//     * @description Установка значения из источника данных
//     * @param value
//     */
//    this.setValue = function(value){
//        if (_.isEqual(value, _value)) {
//            return;
//        }
//        _value = value;
//        notifyOnValueChanged();
//        notifyParameterBinding();
//    };
//
//    /**
//     *
//     * @param {ParameterBinding} binding
//     */
//    this.addDataBinding = function (binding) {
//        if (typeof binding === 'undefined' || binding === null) {
//            return;
//        }
//        //Подписка на изменение значения в элементе
//        binding.onSetPropertyValue(onSetPropertyValueHandler);
//        //Установка текущего значения
//        binding.propertyValueChanged(this.getValue());
//        _bindings.push(binding);
//    };
//
//    var onValueChangedHandlers = [];
//
//    this.onValueChanged = function(handler) {
//        onValueChangedHandlers.push(handler);
//    };
//
//    /**
//     * @description Обработчик изменения значения в элементе.
//     * Устанавливает значение в параметре
//     * @param context
//     * @param args
//     */
//    var onSetPropertyValueHandler = function (context, args) {
//        var propertyName = args.property;
//        var propertyValue = args.value;
//
//        if (propertyName !== undefined && propertyName !== null) {
//            InfinniUI.ObjectUtils.setPropertyValue(_value, propertyName, propertyValue);
//        } else {
//            _value = propertyValue;
//        }
//
//        //@TODO Сгенерировать событие для уведомления об изменении значения параметра
//    }
//}
