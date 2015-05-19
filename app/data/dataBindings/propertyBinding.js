var PropertyBinding = function (view, dataSource, property) {
    this.eventStore = new EventStore();
    this.view = view;
    this.dataSource = dataSource;
    this.property = property;
    this.propertyValue = null;
    this.element = null;
};

PropertyBinding.prototype.onSetPropertyValue = function (handler) {
    this.eventStore.addEvent('onSetPropertyValue', handler);
};

PropertyBinding.prototype.onPropertyValueChanged = function (handler) {
    /** @TODO Избавиться от хардкода element.setValue **/
    if(this.element && this.propertyValue && this.element.setValue){
        this.element.setValue(this.getPropertyValue());
    }

    this.eventStore.addEvent('onPropertyValueChanged', handler);

    //если на момент подписки данные binding уже получены,
    //уведомляем подписчика об этих данных
    if(this.getPropertyValue()){
        this.invokeHandler('onPropertyValueChanged');
    }
};

PropertyBinding.prototype.getView = function () {
    return this.view;
};

PropertyBinding.prototype.getDataSource = function () {
    return this.dataSource;
};

PropertyBinding.prototype.getProperty = function () {
    return this.property;
};

PropertyBinding.prototype.invokeHandler = function(eventName){
    this.eventStore.executeEvent(eventName, this.view.getContext(), {
        dataSource: this.dataSource,
        property: this.property,
        value: this.getPropertyValue() });
};

PropertyBinding.prototype.getPropertyValue = function () {
    var value = this.propertyValue;

    /** @TODO Отрефакторить и вынести. дублирование в setPropertyValue **/
    if (value instanceof Date) {

    } else {
        value = (_.isArray(value) || _.isObject(value)) ? _.clone(value) : value;
    }

    return value;
};

PropertyBinding.prototype.setPropertyValue = function (value) {
    var oldValue = this.getPropertyValue();
    if (_.isEqual(value, oldValue)) {
        return;
    }

    //console.log(value);
    if (value instanceof Date) {
        this.propertyValue = value;
    } else {
        this.propertyValue = (_.isArray(value) || _.isObject(value)) ? _.clone(value) : value;
    }

    //this.propertyValue = value;
    this.invokeHandler('onSetPropertyValue');

    //при изменении значения со стороны внешнего компонента
    //(не визуального контрола и не данного PropertyBinding - например, со стороны BaseItemAction) требуется уведомить обоих
    //участников двустороннего binding.
    //В данный момент - ТЕХНИЧЕСКИЙ ДОЛГ
    //TODO: необходимо сделать посредника, который уведомляет об изменении значения propertyValue всех заинтересованных,
    //TODO: так как в данный момент binding является лишь двусторонним, а требуется сделать его n-сторонним
};

PropertyBinding.prototype.propertyValueChanged = function (value) {
    var oldValue = this.getPropertyValue();
    if (_.isEqual(value, oldValue)) {
        return;
    }

    /** @TODO Отраефакторить. убрать дублирование **/
    if (value instanceof Date) {
        this.propertyValue = value;
    } else {
        this.propertyValue = (_.isArray(value) || _.isObject(value)) ? _.clone(value) : value;
    }


    this.invokeHandler('onPropertyValueChanged');
};

/**
 * Установить связанный с биндингом элеиент
 * @param {Element} value
 */
PropertyBinding.prototype.setElement = function (value) {
    this.element = value;
};

/**
 * Получить связанный с биндингом элемент
 * @returns {Element}
 */
PropertyBinding.prototype.getElement = function () {
    return this.element;
};

PropertyBinding.prototype.bind = function (value) {
    //this.propertyValue = _.clone(value);

    this.propertyValueChanged(value);

    this.invokeHandler('onPropertyValueChanged');
};
