/**
 * @class ParameterBinding
 * @param view
 * @param parameter
 * @param property
 * @constructor
 */
var ParameterBinding = function (view, parameter, property) {

    this.element = null;
    this.view = view;
    this.parameter = parameter;
    this.property = property;
    //this.propertyValue = null;
    this.value = null;
    this.eventStore = new EventStore();
};

/**
 * @description  Устанавливает обработчик события изменения значения в элементе представления.
 * @param {Function} handler
 */
ParameterBinding.prototype.onSetPropertyValue = function (handler) {
    this.eventStore.addEvent('onSetPropertyValue', handler);
};


ParameterBinding.prototype.onPropertyValueChanged = function(handler){
    this.eventStore.addEvent('onPropertyValueChanged', handler);

    //если на момент подписки данные binding уже получены,
    //уведомляем подписчика об этих данных
    if(this.getPropertyValue()){
        this.invokeHandler('onPropertyValueChanged', this.property, this.getPropertyValue());
    }
};

ParameterBinding.prototype.invokeHandler = function(eventName, property, value){
    this.eventStore.executeEvent(eventName, this.view.getContext(), {
        parameter: this.parameter,
        property: property,
        value: _.clone(value)
    });
};


ParameterBinding.prototype.getPropertyValue = function () {
    var propertyName = this.getProperty();
    var propertyValue = null;

    if (typeof propertyName !== 'undefined' && propertyName !== null) {
        if (propertyName.length > 2 && propertyName.substring(0, 2) === '$.') {
            propertyValue = InfinniUI.ObjectUtils.getPropertyValue(this.value, propertyName.substr(2));
        }
        else if (propertyName !== '$') {
            propertyValue = InfinniUI.ObjectUtils.getPropertyValue(this.value, propertyName);
        }
        else {
            propertyValue = this.value;
        }
    } else {
        propertyValue = this.value
    }

    return _.clone(propertyValue);
};

/**
 * @description Устанавливает значение параметра.
 * Вызывает элемент представления для оповещения источника данных об изменениях.
 * @memberOf ParameterBinding.prototype
 * @param value
 */
ParameterBinding.prototype.setPropertyValue = function (value) {
    var oldValue = this.getPropertyValue();
    var propertyName = this.getProperty();

    if (_.isEqual(value, oldValue)) {
        return;
    }

    value = _.clone(value);
    if (propertyName.length > 2 && propertyName.substring(0, 2) === '$.') {
        InfinniUI.ObjectUtils.setPropertyValue(this.value, propertyName.substr(2), value);
    }
    else {
        InfinniUI.ObjectUtils.setPropertyValue(this.value, propertyName, value);
    }

    //Уведомить параметр об изменении значения
    this.invokeHandler('onSetPropertyValue', '', this.value);
};

/**
 * @description Устанавливает значение у элемента представления.
 * Вызывает источник данных для оповещения элемента представления об изменениях.
 * @memberOf ParameterBinding.prototype
 * @param value
 */
ParameterBinding.prototype.propertyValueChanged = function(value){

    if (_.isEqual(value, this.value)) {
        return;
    }

    this.value = _.clone(value);
    //Уведомить элемент представления об изменении значения
    this.invokeHandler('onPropertyValueChanged', this.property, this.getPropertyValue());
};

ParameterBinding.prototype.getProperty = function () {
    return this.property;
};

ParameterBinding.prototype.setElement = function (element) {
    this.element = element;
};

ParameterBinding.prototype.getElement = function () {
    return this.element;
};

