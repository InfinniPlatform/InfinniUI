var DataNavigationModel = ControlModel.extend({

    defaults: _.defaults({
            pageNumber: 0,
            pageStart: 0,
            _buttonsCount: 5,
            _buttonsTemplate: ['prev', 'page', 'next']
        },
        ControlModel.prototype.defaults
    ),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.set('availablePageSizes', new Collection());
        this.on('change:pageNumber', this.updatePageStart, this);
        this.on('change:pageSize', this.updatePageSize, this);
    },

    updatePageStart: function () {
        var
            pageNumber = this.get('pageNumber'),
            pageStart = this.get('pageStart'),
            buttonsCount = this.get('_buttonsCount');

        if (pageNumber + 1 >= pageStart + buttonsCount) {
            //Выбрана последняя страница по кнопкам навигации. переместить ее в центр
            pageStart = pageStart + Math.floor(buttonsCount / 2);
        } else if (pageNumber === pageStart) {
            //Сдвинуть кнопки навигации вправо, чтобы выбранная страница была в центре
            pageStart = Math.max(0, pageStart - Math.floor(buttonsCount / 2));
        } else if (pageNumber + 1 < pageStart) {
            pageStart = Math.max(0, pageNumber - 1);
        }
        this.set('pageStart', pageStart);
    },

    updatePageSize: function () {
        //сьрос навигации
        this.set('pageNumber', 0);
    },

    nextPage: function () {
        var pageNumber = this.get('pageNumber');
        this.set('pageNumber', pageNumber + 1);
    },

    prevPage: function () {
        var pageNumber = this.get('pageNumber');
        if (pageNumber > 0) {
            this.set('pageNumber', pageNumber - 1);
        }
    },

    onPageNumberChanged: function (handler) {
        this.on('change:pageNumber', function (model, value) {
            handler.call(null, {value: value});
        });
    },

    onPageSizeChanged: function (handler) {
        this.on('change:pageSize', function (model, value) {
            handler.call(null, {value: value});
        });
    }

});