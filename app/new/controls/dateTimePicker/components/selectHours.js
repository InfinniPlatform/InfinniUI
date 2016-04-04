var SelectHoursModel = SelectComponentModel.extend({

    initialize: function () {
        SelectComponentModel.prototype.initialize.call(this);
        this.on('change:hour', this.updateDatePart.bind(this, 'hour'));
    },

    checkRange: function (value) {
        var min = this.get('min'),
            max = this.get('max'),
            success = true;

        var mMin = moment(min),
            mMax = moment(max),
            mVal = moment(value);

        [mMin, mMax].forEach(function (val) {
            val.set({
                year: mVal.year(),
                month: mVal.month(),
                date: mVal.date()
            });
        });


        if (!isEmpty(min) && !isEmpty(max)) {
            success = mVal.isBetween(mMin, mMax, 'minute') || mVal.isSame(mMin, 'minute') || mVal.isSame(mMax, 'minute');
        } else if (!isEmpty(min) && isEmpty(max)) {
            success = mMin.isBefore(value, 'minute') || mMin.isSame(value, 'minute');
        } else if (isEmpty(min) && !isEmpty(max)) {
            success = mMax.isAfter(value, 'minute') || mMax.isSame(value, 'minute');
        }

        return success;

        function isEmpty(value) {
            return typeof value === 'undefined' || _.isEmpty(value);
        }
    }

});

var SelectHours = SelectComponent.extend({

    modelClass: SelectHoursModel,

    template: InfinniUI.Template["new/controls/dateTimePicker/template/time/hours.tpl.html"],

    events: {
        "click .hour:not('.hour-unavailable')": "useHour"
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
        var
            model = this.model;
        var now = new Date();

        this.ui.hour.each(function (i, el) {
            var $el = $(el);
            var hour = stringUtils.padLeft(i, 2, '0');

            $el.attr('data-hour', i);
            $el.text(hour);
            markNow($el, i);
            markSelected($el, i);
            markAvailable($el, i);
        });

        function markSelected($el, value) {
            $el.toggleClass('hour-selected', now.getHours() === value);
        }

        function markNow($el, value) {
            var selected = moment(now).isSame(value, 'hour');
            $el.toggleClass('hour-today', selected);
        }

        function markAvailable($el, value) {
            var date = moment(model.get('date')).hour(value);
            $el.toggleClass('hour-unavailable', !model.checkRange(date));
        }
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:date', this.fillHoursTable);
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
