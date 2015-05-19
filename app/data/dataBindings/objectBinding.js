function ObjectBinding(view, items){
    var eventStore = new EventStore();

    this.getView = function(){
        return view;
    };

    var value = items;

    this.setPropertyValue = function(propertyValue){
        value = propertyValue;

        eventStore.executeEvent('onPropertyValueChanged', view.getContext(), { value: items })
    };

    this.onPropertyValueChanged = function(handler){
        eventStore.addEvent('onPropertyValueChanged', handler);
    };
}