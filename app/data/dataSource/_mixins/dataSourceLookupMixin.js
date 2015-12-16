var dataSourceLookupMixin = {

    lookupPropertyValue: function (name, cb, sourceProperty) {
        var items = this.getItems();
        var value, item;

        if (Array.isArray(items) && typeof cb === 'function') {
            var propertyValue = this.getProperty(sourceProperty);

            for (var i = 0; i < items.length; i = i + 1) {
                item = items[i];
                if (cb.call(null, propertyValue) === true) {
                    value = InfinniUI.ObjectUtils.getPropertyValue(item, name);
                    break;
                }
            }
        }

        return value;
    }

};