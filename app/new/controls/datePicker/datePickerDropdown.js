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
        $(document).on('click', function (event) {

        });
    },

    renderComponents: function () {
        var months = new DatePickerMonths({
            el: this.ui.months,
            model: this.model
        });
        months.render();

        var years = new DatePickerYears({
            el: this.ui.years,
            model: this.model
        });
        years.render();

        var days = new DatePickerDays({
            el: this.ui.days,
            model: this.model
        });
        days.render();

        this.listenTo(days, 'years', this.showYearsPanel);
    },

    onClickBackdropHandler: function(event) {
        this.remove();
    },

    showYearsPanel: function () {
        this.ui.days.hide();
        this.ui.years.show();
    }


});

_.extend(DatePickerDropdown.prototype, bindUIElementsMixin);