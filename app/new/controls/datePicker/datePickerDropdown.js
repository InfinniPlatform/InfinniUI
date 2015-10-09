var DatePickerDropdown = Backbone.View.extend({

    className: 'pl-datepicker-dropdown',

    template: InfinniUI.Template["new/controls/datePicker/template/datePicker.dropdown.tpl.html"],

    UI: {
        days: '.days',
        months: '.months',
        years: '.years'
    },

    events: {
        'click .backdrop': 'onClickBackdropHandler',
        'click .datepicker-clear': 'onClickClearValueHandler',
        'click .today-date': 'onClickTodayHandler'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        this.renderComponents();
    },

    renderComponents: function () {
        var model = this.model;
        var value = model.get('value');
        var m = moment(value);

        if (m.isValid()) {
            value = m.toDate();
        } else {
            value = null;
        }

        var options = {
            value: value,
            //date: value,
            max: model.get('maxValue'),
            min: model.get('minValue')
        };

        options.el = this.ui.months;
        var months = new DatePickerMonths(options);

        options.el = this.ui.years;
        var years = new DatePickerYears(options);

        options.el = this.ui.days;
        var days = new DatePickerDays(options);

        this.months = months;
        this.years = years;
        this.days = days;

        this.workflow(days, months, years, value)(value);
    },

    onClickBackdropHandler: function (event) {
        this.remove();
    },

    onClickClearValueHandler: function () {
        this.clearValue();
    },

    clearValue: function () {
        this.useValue(null);
    },

    useValue: function (date) {
        this.trigger('date', date);
        this.remove();
    },

    workflow: function (days, months, years) {

        this
            .listenTo(days, 'date', this.useValue)
            .listenTo(days, 'year', function (date) {
                showYears(date);//Needed select year from list
            })
            .listenTo(years, 'year', function (date) {
                showMonths(date);//Needed select month for year
            })
            .listenTo(months, 'year', function (date) {
                showYears(date);//Needed select year from list
            })
            .listenTo(months, 'month', function (date) {
                showDays(date);//Needed select day from calendar
            });

        return showDays;

        function showDays(date) {
            days.setDate(date);

            years.hide();
            months.hide();
            days.show();
        }

        function showMonths(date) {
            months.setDate(date);

            days.hide();
            years.hide();
            months.show();
        }

        function showYears(date) {
            years.setDate(date);

            days.hide();
            months.hide();
            years.show();
        }

    },

    onClickTodayHandler: function () {
        var days = this.days,
            months = this.months,
            years = this.years,
            today = moment().toDate();

        //days.setDate(today);
        //months.setDate(today);
        //years.setDate(today);

        days.today();
        months.today();
        years.today();
    }

});

_.extend(DatePickerDropdown.prototype, bindUIElementsMixin);