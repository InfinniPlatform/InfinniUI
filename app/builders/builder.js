function Builder() {
    var objectBuilders = [];

    this.appView = null;

    this.register = function (metadataType, objectBuilder) {
        objectBuilders[metadataType] = objectBuilder;
    };

    this.buildType = function (parentView, metadataType, metadataValue, collectionProperty, params) {
        if (objectBuilders[metadataType] === undefined) {
            return null;
        }

        var args = {
                        builder: this,
                        view: parentView,
                        metadata: metadataValue,
                        collectionProperty: collectionProperty,
                        params: params
                    };
        var context = parentView && parentView.getContext && parentView.getContext();
        return objectBuilders[metadataType].build(context, args);
    };

    this.build = function (parentView, metadataValue, collectionProperty, params) {
        var key,
            value,
            result = null;

        for (var p in metadataValue) {
            key = p;
            break; // берем первое найденное свойство в объекте! Остальное игнорируем
        }

        if (typeof key === 'undefined' || key === null) {
            console.error('Builder: Не переданы метаданные');
        } else {
            value = metadataValue[key];
            result = this.buildType(parentView, key, value, collectionProperty);
        }
        return result;
    };

    this.buildMany = function (parentView, metadataValue, collectionProperty) {

        var items = [];

        if (metadataValue) {
            for (var i = 0; i < metadataValue.length; i++) {
                var item = this.build(parentView, metadataValue[i], collectionProperty);

                if (item !== null) {
                    items.push(item);
                }
            }
        }

        return items;
    }
}
