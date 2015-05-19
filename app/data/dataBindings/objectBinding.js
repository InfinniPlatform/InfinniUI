function ObjectBinding(view, items){
    var eventStore = new EventStore();

    var element;

    this.getView = function(){
        return view;
    };

    var value = items;


    this.getPropertyValue = function () {
        return items;
    };

    this.setPropertyValue = function(propertyValue){
        value = propertyValue;

        eventStore.executeEvent('onPropertyValueChanged', view.getContext(), { value: items })
    };

    this.onPropertyValueChanged = function(handler){
        eventStore.addEvent('onPropertyValueChanged', handler);
    };

    /**
     * Установить связанный с биндингом элеиент
     * @param {Element} value
     */
    this.setElement = function (value) {
        element = value;
    };

    /**
     * Получить связанный с биндингом элемент
     * @returns {Element}
     */
    this.getElement = function () {
        return element;
    };

    this.setPropertyValue(items);
}