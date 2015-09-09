var DatePickerYearsModel = Backbone.Model.extend({

    defaults: {
        pageSize: 20,
        page: 0,
        todayYear: moment().year()
    },

    //getStartYear: function (year) {
    //    var pageSize = this.get('pageSize');
    //
    //    return Math.ceil(year - pageSize / 2);
    //},

    initialize: function () {
        this.on('change:date', this.onChangeDateHandler, this);
        this.on('change:year', this.onChangeYearHandler, this);
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

    onChangeDateHandler: function (model, value) {
        if (typeof value !== 'undefined' && value !== null) {
            model.set('year', moment(value).year());
        } else {
            model.set('year', null);
        }
    },

    onChangeYearHandler: function (model, value) {
        model.set('page', 0);
    }
});

var DatePickerYears = DatePickerComponent.extend({

    modelClass: DatePickerYearsModel,

    template: InfinniUI.Template["new/controls/datePicker/template/date/years.tpl.html"],

    events: {
        'click .btn-year-prev': "prevPage",
        'click .btn-year-next': "nextPage",
        'click .today-year': "showTodayYear",
        'click .year': "useYear"
    },

    UI: {
        years: '.year',
        yearBegin: '.year-begin',
        yearEnd: '.year-end'
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:page', this.fillYearsTable);
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
            startYear = Math.ceil((year || todayYear) - pageSize / 2) + page * pageSize;

        this.ui.years.each(function (i, el) {
            var $el = $(el);
            var year = startYear + i;
            $el.text(year);
            $el.attr('data-year', year);
            markTodayYear($el, year === todayYear);
        });

        this.ui.yearBegin.text(startYear);
        this.ui.yearEnd.text(startYear + pageSize - 1);

        function markTodayYear($el, current) {
            $el.toggleClass('year-today', current);
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
        var $el = $(event.target);

        this.trigger('year', parseInt($el.attr('data-year'), 10));
    }

});
