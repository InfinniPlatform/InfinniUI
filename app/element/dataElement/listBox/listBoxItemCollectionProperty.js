
function ListBoxItemCollectionProperty(baseBindingProperty, baseIndex, parentCollectionProperty ) {

    /*возвращает полный путь к свойству элемента в коллекции*/
    this.resolve = function(itemBindingProperty) {

        if (typeof parentCollectionProperty !== 'undefined' && parentCollectionProperty !== null) {
            itemBindingProperty = parentCollectionProperty.resolve(itemBindingProperty);
        }

        if(baseBindingProperty && baseBindingProperty !== '') {
            return baseBindingProperty + '.' + stringUtils.formatBinding(itemBindingProperty,baseIndex);
        }
        else {
            return stringUtils.formatBinding(itemBindingProperty, baseIndex);
        }
    };
}
