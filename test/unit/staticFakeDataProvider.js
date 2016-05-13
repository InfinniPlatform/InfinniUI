function StaticFakeDataProvider() {}


_.extend(StaticFakeDataProvider.prototype, {
    items: [
        {
            "_id": '1',
            "FirstName": "Иван",
            "LastName": "Иванов"
        },
        {
            "_id": '2',
            "FirstName": "Петр",
            "LastName": "Петров"
        },
        {
            "_id": '3',
            "FirstName": "Иван1",
            "LastName": "Иванов1"
        },
        {
            "_id": '4',
            "FirstName": "Петр2",
            "LastName": "Петров2"
        },
        {
            "_id": '5',
            "FirstName": "Иван3",
            "LastName": "Иванов3"
        },
        {
            "_id": '6',
            "FirstName": "Петр4",
            "LastName": "Петров5"
        },
        {
            "_id": '10',
            "FirstName": "Анна",
            "LastName": "Сергеева"

        }
    ],

    getItems: function(resultCallback, criteriaList, pageNumber, pageSize, sorting){
        var result = _.clone(this.items);
        setTimeout(function(){
            resultCallback({
                data: {
                    Result: {
                        Items:result
                    }
                }
            });
        },100);
    },

    createLocalItem: function () {
        var maxId = _.chain(this.items)
            .map(function(item){ return parseInt(item._id); })
            .max()
            .value();

        return {
            "_id": maxId + 1
        };
    },

    saveItem: function (value, resultCallback, warnings) {

        var itemIndex = _.findIndex(this.items, function(item) {
            return item._id === value._id;
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

    setOrigin: function(){},
    setPath: function(){},
    setData : function(){},
    setFilter: function(){},
    setDocumentId: function(){}
});