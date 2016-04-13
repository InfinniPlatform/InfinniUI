function StaticFakeDataProvider() {}


_.extend(StaticFakeDataProvider.prototype, {
    items: [
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
    ],

    getItems: function(resultCallback, criteriaList, pageNumber, pageSize, sorting){
        var result = _.clone(this.items);
        setTimeout(function(){
            resultCallback({data:result});
        },100);
    },

    createLocalItem: function () {
        var maxId = _.chain(this.items)
            .map(function(item){ return parseInt(item.Id); })
            .max()
            .value();

        return {
            "Id": maxId + 1
        };
    },

    saveItem: function (value, resultCallback, warnings) {

        var itemIndex = _.findIndex(this.items, function(item) {
            return item.Id === value.Id;
        });

        if (itemIndex !== -1) {
            this.items[itemIndex] = value;
        }
        else {
            this.items.push(value);
        }

        var result = _.clone(this.items);
        setTimeout(function(){
            resultCallback(result);
        },90);
    },

    setCreateAction: function(){},
    setUpdateAction: function(){},
    setReadAction: function(){},
    setDeleteAction: function(){},
    setConfigId: function(){},
    setDocumentId: function(){}
});