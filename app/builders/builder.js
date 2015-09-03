function Builder() {
    var objectBuilders = [];

    this.appView = null;

    this.register = function (metadataType, objectBuilder) {
        objectBuilders[metadataType] = objectBuilder;
    };

    this.buildType = function (metadataType, metadataValue, args) {
        if (objectBuilders[metadataType] === undefined) {
            return null;
        }

        var resultArgs = _.extend({
                builder: this,
                metadata: metadataValue
            }, args);
        var context = args.parentView ? args.parentView.getContext() : {};
        return objectBuilders[metadataType].build(context, resultArgs);
    };

    this.build = function (metadataValue, args) {
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
            result = this.buildType(key, value, args);
        }
        return result;
    };

    this.buildMany = function (metadataValue, args) {

        var items = [];

        if (metadataValue) {
            for (var i = 0; i < metadataValue.length; i++) {
                var item = this.build(metadataValue[i], args);

                if (item !== null) {
                    items.push(item);
                }
            }
        }

        return items;
    }
}
