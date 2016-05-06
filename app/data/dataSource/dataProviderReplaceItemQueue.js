/**
 * @description Организация очереди запросов на создание/изменение документа.
 * Признак одного и того же документа по атрибутам Id или __Id (@see {@link EditDataSourceStrategy.getItems})
 * @param attributes
 * @constructor
 */
var DataProviderReplaceItemQueue = function (attributes) {
    var _attributes = attributes || [];
    var _queue = [];
    var requestIdProperty = '__Id';

    var getQueueItemCriteria = function (data) {
        var criteria = _.pick(data, _attributes);
        var idProperty = _.isEmpty(data[requestIdProperty]) ? 'Id' : requestIdProperty;
        criteria[idProperty] = data[idProperty];
        return criteria;
    };

    var getQueueItem = function (data) {
        return _.findWhere(_queue, getQueueItemCriteria(data));
    };

    var getQueueItems = function (data) {
        return _.where(_queue, getQueueItemCriteria(data));
    };

    var updateInstanceId = function (data, response) {
        var items = getQueueItems(data);
        items.forEach(function (item) {
            item.Id = response.Id;
            item.value.Id = response.Id;
        });
    };

    var next = function (data) {
        var index = _queue.indexOf(data);
        if (index === -1) {
            console.error('DataProviderReplaceItemQueue: Не найден запрос в очереди');
        }
        _queue.splice(index, 1);
        var item = getQueueItem(data);
        run(item);
    };

    var run = function (data) {
        if (typeof data === 'undefined' || data === null) {
            return;
        }
        data.request(data)
            .done(updateInstanceId.bind(undefined, data))
            .always(next.bind(undefined, data));
    };


    this.append = function (data, request) {
        var item = _.defaults(data, _.pick(data.value, ['Id', requestIdProperty]));
        item.request = request;

        var items = getQueueItems(item);
        _queue.push(item);

        if (items.length === 0) {
            //В очереди нет запросов с заданными параметрами
            run(data);
        } else if (items.length > 1) {
            //В очереди несколько элементов, удаляем промежуточные
            for (var i = 1, ln = items.length; i < ln; i = i + 1) {
                var index = _queue.indexOf(items[i]);
                _queue.splice(index, 1);
            }
        }
    };

};
