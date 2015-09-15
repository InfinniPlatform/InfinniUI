var DatePickerYearsModel = DatePickerComponentModel.extend({

    defaults: {
        pageSize: 20,
        page: 0,
        todayYear: moment().year()
    },

    initialize: function () {
        DatePickerComponentModel.prototype.initialize.call(this);
        this.on('change:year', this.updateDatePart.bind(this, 'year'));
        this.on('change:year', this.onChangeYearHandler);
    },

    prevPage: function () {
        var page = this.get('page');
        this.set('page', page - 1);
    },

    nextPage: function () {
        var page = this.get('page');
        this.set('page', page + 1);
    },

    resetPage: function () {
        this.set('page', 0);
    },

    onChangeYearHandler: function (model, value) {
        model.set('page', 0);
    },

    checkRange: function (value) {
        var min = this.get('min'),
            max = this.get('max'),
            success = true;

        var mMin = moment(min),
            mMax = moment(max),
            mVal = moment(value);

        if (!isEmpty(min) && !isEmpty(max)) {
            success = mVal.isBetween(min, max, 'year') || mVal.isSame(mMin, 'year') || mVal.isSame(mMax, 'year');
        } else if (!isEmpty(min) && isEmpty(max)) {
            success = mMin.isBefore(value, 'year') || mMin.isSame(value, 'year');
        } else if (isEmpty(min) && !isEmpty(max)) {
            success = mMax.isAfter(value, 'year') || mMax.isSame(value, 'year');
        }

        return success;

        function isEmpty(value) {
            return typeof value === 'undefined' || _.isEmpty(value);
        }

    }
});

var DatePickerYears = DatePickerComponent.extend({

    modelClass: DatePickerYearsModel,

    template: InfinniUI.Template["new/controls/datePicker/template/date/years.tpl.html"],

    events: {
        'click .btn-year-prev': "prevPage",
        'click .btn-year-next': "nextPage",
        'click .today-year': "showTodayYear",
        'click .year:not(".year-unavailable")': "useYear"
    },

    UI: {
        years: '.year',
        yearBegin: '.year-begin',
        yearEnd: '.year-end'
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:page', this.fillYearsTable);
        this.listenTo(this.model, 'change:year', this.fillYearsTable);
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        //this.fillCalendar();
        this.fillYearsTable();
        this.initOnChangeHandlers();
    },

    fillYearsTable: function () {
        var
            model = this.model,
            page = model.get('page'),
            pageSize = model.get('pageSize'),
            year = model.get('year'),
            todayYear = model.get('todayYear'),
            //startYear = Math.ceil((year || todayYear) - pageSize / 2) + page * pageSize;
            startYear = Math.ceil(year - pageSize / 2) + page * pageSize;

        this.ui.years.each(function (i, el) {
            var $el = $(el);
            var year = startYear + i;
            $el.text(year);
            $el.attr('data-year', year);
            markTodayYear($el, year);
            markSelected($el, year);
            markAvailable($el, year);
        });

        this.ui.yearBegin.text(startYear);
        this.ui.yearEnd.text(startYear + pageSize - 1);

        function markTodayYear($el, value) {
            $el.toggleClass('year-today', value === todayYear);
        }

        function markSelected($el, value) {
            $el.toggleClass('year-selected', value === year);
        }
        function markAvailable($el, value) {
            var date = moment([value]);
            $el.toggleClass('year-unavailable', !model.checkRange(date));
        }

    },

    prevPage: function () {
        this.model.prevPage();
    },

    nextPage: function () {
        this.model.nextPage();
    },

    showTodayYear: function () {
        this.model.resetPage();
    },

    useYear: function (event) {
        var $el = $(event.target),
            model = this.model;

        model.set({
            year: parseInt($el.attr('data-year'), 10)
        });

        this.trigger('year', model.get('date'));
    }

});
