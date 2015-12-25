var dataSourceLookupMixin = {

    lookupIdPropertyValue: function (sourceProperty) {
        var items = this.getItems();
        var value, item;

        if (Array.isArray(items)) {
            var
                name = [sourceProperty.split('.')[0], this.getIdProperty()].join('.');

            value = this.getProperty(name);
        }

        return value;
    },

    lookupPropertyValue: function (name, cb, sourceProperty) {
        var items = this.getItems();
        var value, item;

        if (Array.isArray(items) && typeof cb === 'function') {
            var path = sourceProperty.split('.');

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