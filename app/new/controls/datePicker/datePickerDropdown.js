var DatePickerDropdown = Backbone.View.extend({

    className: 'pl-datepicker-dropdown',

    template: InfinniUI.Template["new/controls/datePicker/template/datePicker.dropdown.tpl.html"],

    UI: {
        days: '.days',
        months: '.months',
        years: '.years'
    },

    events: {
        'click .backdrop': 'onClickBackdropHandler'
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

        this.workflow(days, months, years, value)(value);
    },

    onClickBackdropHandler: function (event) {
        this.remove();
    },

    workflow: function (days, months, years) {
        //var
        //    value = this.model.get('value'),
        //    date,
        //    day,
        //    month,
        //    year;
        //
        //if (typeof value !== 'undefined' && value !== null) {
        //    date = moment(value);
        //    day = date.date();
        //    month = date.month();
        //    year = date.year();
        //}

        this
            .listenTo(days, 'date', function (date) {
                //Input complete. close dropdown
                this.trigger('date', date);
                this.remove();
            })
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

    }


});

_.extend(DatePickerDropdown.prototype, bindUIElementsMixin);