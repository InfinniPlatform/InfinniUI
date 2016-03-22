var DatePickerMonthsModel = DatePickerComponentModel.extend({

    defaults: {
        today: moment().toDate(),
        todayMonth: moment().month(),
        todayYear: moment().year()
    },

    initialize: function () {
        DatePickerComponentModel.prototype.initialize.call(this);
        this.on('change:month', this.updateDatePart.bind(this, 'month'));
        this.on('change:year', this.updateDatePart.bind(this, 'year'));
    },



    nextYear: function () {
        var year = this.get('year');
        this.set('year', year + 1);
    },

    prevYear: function () {
        var year = this.get('year');
        this.set('year', year - 1);
    },

    today: function () {
        this.set({
            month: this.get('todayMonth'),
            year: this.get('todayYear')
        });
    },

    checkRange: function (value) {
        var min = this.get('min'),
            max = this.get('max'),
            success = true;

        var mMin = moment(min),
            mMax = moment(max),
            mVal = moment(value);

        if (!isEmpty(min) && !isEmpty(max)) {
            success = mVal.isBetween(min, max, 'month') || mVal.isSame(mMin, 'month') || mVal.isSame(mMax, 'month');
        } else if (!isEmpty(min) && isEmpty(max)) {
            success = mMin.isBefore(value, 'month') || mMin.isSame(value, 'month');
        } else if (isEmpty(min) && !isEmpty(max)) {
            success = mMax.isAfter(value, 'month') || mMax.isSame(value, 'month');
        }

        return success;

        function isEmpty(value) {
            return typeof value === 'undefined' || _.isEmpty(value);
        }

    }



});

var DatePickerMonths = DatePickerComponent.extend({

    modelClass: DatePickerMonthsModel,

    template: InfinniUI.Template["new/controls/datePicker/template/date/months.tpl.html"],

    events: {
        "click .btn-year-prev": "prevYear",
        "click .btn-year-next": "nextYear",
        "click .month:not('.month-unavailable')": "useMonth",
        "click .year": "selectYear",
        "click .today-month": "showToday"
    },

    UI: {
        month: '.month',
        year: '.year'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        this.fillMonthsTable();
        this.initOnChangeHandlers();
    },

    fillMonthsTable: function () {
        this.ui.year.text(this.model.get('year'));

        var
            model = this.model,
            dateTimeFormatInfo = localized.dateTimeFormatInfo,
            todayMonth = model.get('todayMonth'),
            month = model.get('month');

        this.ui.month.each(function (i, el) {
            var $el = $(el);
            $el.text(dateTimeFormatInfo.abbreviatedMonthNames[i]);
            $el.attr('data-month', i);
            markTodayMonth($el, i);
            markSelected($el, i);
            markAvailable($el, i);
        });

        function markTodayMonth($el, value) {
            var date = moment([model.get('year'), value]);
            var today = model.get('today');

            $el.toggleClass('month-today', moment(date).isSame(today, 'month'));
        }

        function markSelected($el, value) {
            var date = moment([model.get('year'), value]);
            var selected = model.get('value');

            $el.toggleClass('month-selected', moment(date).isSame(selected, 'month'));
        }

        function markAvailable($el, value) {
            var date = moment([model.get('year'), value]);
            $el.toggleClass('month-unavailable', !model.checkRange(date));
        }
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:year', this.fillMonthsTable);
    },

    prevYear: function () {
        this.model.prevYear();
    },

    nextYear: function () {
        this.model.nextYear();
    },

    useMonth: function (event) {
        var
            $el = $(event.target),
            model = this.model;

        model.set({
            year: parseInt(model.get('year'), 10),
            month: parseInt($el.attr('data-month'), 10)
        });
        this.trigger('month', model.get('date'));
    },

    selectYear: function () {
        var
            model = this.model;

        this.trigger('year', model.get('data'));
    },

    showToday: function () {
        this.today();
    },

    today: function () {
        this.model.today();
    }



});
