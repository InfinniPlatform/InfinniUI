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
            "Id": '3',
            "FirstName": "Иван1",
            "LastName": "Иванов1"
        },
        {
            "Id": '4',
            "FirstName": "Петр2",
            "LastName": "Петров2"
        },
        {
            "Id": '5',
            "FirstName": "Иван3",
            "LastName": "Иванов3"
        },
        {
            "Id": '6',
            "FirstName": "Петр4",
            "LastName": "Петров5"
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

            if(criteriaList && criteriaList.length == 1 && criteriaList[0].CriteriaType == 1){
                result = _.filter(result, function(item){
                    return item.Id == criteriaList[0].Value;
                });
            }

            setTimeout(function(){
                resultCallback(result);
            }, 100);

        }
        else {
            setTimeout(function(){
                resultCallback(itemsUpdated);
            }, 100);
        }
    };

    this.createItem = function (resultCallback) {
        setTimeout(function(){
            resultCallback({prefilledField: 1, Id:1, __Id:1});
        },100);

    };

    this.saveItem = function (value, resultCallback, warnings) {

        var itemIndex = -1;

        if(value['__Id']){
            delete value['__Id'];
        }

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

        setTimeout(function(){
            resultCallback(items);
        },90);
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

    this.setCreateAction = function(){};
    this.setUpdateAction = function(){};
    this.setReadAction = function(){};
    this.setDeleteAction = function(){};
    this.setConfigId = function(){};
    this.setDocumentId = function(){};
}
