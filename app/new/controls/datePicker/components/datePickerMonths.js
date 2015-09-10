var DatePickerMonthsModel = Backbone.Model.extend({

    defaults: {
        todayMonth: moment().month()
    },

    initialize: function () {
        this.on('change:date', this.onChangeDateHandler, this);
    },

    onChangeDateHandler: function (model, value) {
        if (typeof value !== 'undefined' && value !== null) {
            model.set('month', moment(value).month());
            model.set('year', moment(value).year());
        } else {
            model.set('month', null);
            model.set('year', null);
        }
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
    }


});

var DatePickerMonths = DatePickerComponent.extend({

    modelClass: DatePickerMonthsModel,

    template: InfinniUI.Template["new/controls/datePicker/template/date/months.tpl.html"],

    events: {
        "click .btn-year-prev": "prevYear",
        "click .btn-year-next": "nextYear",
        "click .month": "useMonth",
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
            dateTimeFormatInfo = localized.dateTimeFormatInfo,
            todayMonth = this.model.get('todayMonth'),
            month = this.model.get('month');

        this.ui.month.each(function (i, el) {
            var $el = $(el);
            $el.text(dateTimeFormatInfo.abbreviatedMonthNames[i]);
            $el.attr('data-month', i);
            markTodayMonth($el, i);
            markSelected($el, i);
        });

        function markTodayMonth($el, value) {
            $el.toggleClass('month-today', value === todayMonth);
        }

        function markSelected($el, value) {
            $el.toggleClass('month-selected', value === month);
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
            model = this.model,
            year = parseInt(model.get('year'), 10),
            month = parseInt($el.attr('data-month'), 10);

        this.trigger('month', new Date(year, month));
    },

    selectYear: function () {
        var
            model = this.model,
            year = parseInt(model.get('year'), 10),
            month = parseInt(model.get('month'), 10);

        this.trigger('year', new Date(year, month));
    },

    showToday: function () {
        this.model.today();
    }



});
