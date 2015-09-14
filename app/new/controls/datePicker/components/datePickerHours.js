var DatePickerHoursModel = DatePickerComponentModel.extend({

    initialize: function () {
        DatePickerComponentModel.prototype.initialize.call(this);
        this.on('change:hour', this.updateDatePart.bind(this, 'hour'));
    }

});

var DatePickerHours = DatePickerComponent.extend({

    modelClass: DatePickerHoursModel,

    template: InfinniUI.Template["new/controls/datePicker/template/time/hours.tpl.html"],

    events: {
        "click .hour": "useHour"
    },

    UI: {
        hour: '.hour'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        this.fillHoursTable();
        this.initOnChangeHandlers();
    },

    fillHoursTable: function () {
        //@TODO Заполнять в зависимости от формата 12/24
        var valueDate = this.model.get('value');
        var now = new Date();

        this.ui.hour.each(function (i, el) {
            var $el = $(el);
            var hour = stringUtils.padLeft(i, 2, '0');

            $el.attr('data-hour', i);
            $el.text(hour);
            markNow($el, i);
            markSelected($el, i);
        });

        function markSelected($el, value) {
            $el.toggleClass('hour-selected', now.getHours() === value);
        }

        function markNow($el, value) {
            var selected = moment(now).isSame(value, 'hour');
            $el.toggleClass('hour-today', selected);
        }
    },

    initOnChangeHandlers: function () {

    },

    useHour: function (event) {
        var
            $el = $(event.target),
            model = this.model,
            date = model.get('date'),
            hour = parseInt($el.attr('data-hour'), 10);

        date.setHours(hour);
        this.trigger('hour', date);
    }

});
