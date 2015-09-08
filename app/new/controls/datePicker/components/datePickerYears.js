var DatePickerYears = Backbone.View.extend({

    template: InfinniUI.Template["new/controls/datePicker/template/date/years.tpl.html"],

    UI: {
        years: '.year'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();

        this.fillCalendar();
    },

    fillCalendar: function () {
        var
            date,
            value = this.model.get('value');

        if (typeof value === 'undefined' || value === null) {
            date = moment()
        } else {
            date = moment(value);
        }

        var count = this.ui.years.length;
        var currentYear = date.year();

        var startYear = Math.ceil(currentYear - this.ui.years.length / 2);

        this.ui.years.each(function (i, el) {
            var $el = $(el);
            $el.text(startYear + i);
            markCurrentYear($el, startYear + 1 === currentYear);
        });

        function markCurrentYear($el, current) {
            $el.toggleClass('year-current', current);
        }
    }

});

_.extend(DatePickerYears.prototype, bindUIElementsMixin);
