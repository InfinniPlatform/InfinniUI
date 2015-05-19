function FakeDataProvider(mode) {

    var items = [
        {
            "Id": '1',
            "FirstName": "Иван",
            "LastName": "Иванов"
        },
        {
            "Id": '2',
            "FirstName": "Петр",
            "LastName": "Петров"
        },
        {
            "Id": '10',
            "FirstName": "Анна",
            "LastName": "Сергеева"

        }
    ];

    var itemsUpdated = [
        {
            "Id": '4',
            "FirstName": "Федор",
            "LastName": "Федоров"
        },
        {
            "Id": '5',
            "FirstName": "Сидор",
            "LastName": "Сидоров"
        }
    ];

    this.getItems = function (criteriaList, pageNumber, pageSize, sorting, resultCallback) {
        if (mode === undefined || mode() === 'Created') {

            var result = [];
            var allItems = items;
            for (var i = 0; i < pageSize; i++) {
                var itemIndex = i + (pageNumber * pageSize);
                if (itemIndex < allItems.length) {
                    result.push(items[itemIndex]);
                }
                else {
                    break;
                }
            }
            resultCallback(result);
        }
        else {
            resultCallback(itemsUpdated);
        }
    };

    this.createItem = function (resultCallback) {
        resultCallback({});
    };

    this.replaceItem = function (value, warnings, resultCallback) {

        var itemIndex = -1;

        for (var i = 0; i < items.length; i++) {
            if (items[i].Id === value.Id) {
                itemIndex = i;
                break;
            }
        }

        if (itemIndex !== -1) {
            items[itemIndex] = value;
        }
        else {
            items.push(value);
        }

        resultCallback(items);
    };

    this.deleteItem = function (value, resultCallback) {
        var itemIndex = items.indexOf(value);
        items.splice(itemIndex, 1);
        resultCallback(items);
    };

    this.getItem = function (itemId, resultCallback) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].Id === itemId) {
                resultCallback([items[i]]);
                return;
            }
        }
        resultCallback(null);
    };

}
