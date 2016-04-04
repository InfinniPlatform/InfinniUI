var SelectSecondsModel = SelectComponentModel.extend({

    initialize: function () {
        SelectComponentModel.prototype.initialize.call(this);
        this.on('change:second', this.updateDatePart.bind(this, 'second'));
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
            success = mVal.isBetween(min, max, 'second') || mVal.isSame(mMin, 'second') || mVal.isSame(mMax, 'second');
        } else if (!isEmpty(min) && isEmpty(max)) {
            success = mMin.isBefore(value, 'second') || mMin.isSame(value, 'second');
        } else if (isEmpty(min) && !isEmpty(max)) {
            success = mMax.isAfter(value, 'second') || mMax.isSame(value, 'second');
        }

        return success;

        function isEmpty(value) {
            return typeof value === 'undefined' || _.isEmpty(value);
        }
    }

});

var SelectSeconds = SelectComponent.extend({

    modelClass: SelectSecondsModel,

    template: InfinniUI.Template["new/controls/dateTimePicker/template/time/seconds.tpl.html"],

    events: {
        "click .second:not('.second-unavailable')": "useSecond"
    },

    UI: {
        second: '.second'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        this.fillSecondsTable();
        this.initOnChangeHandlers();
    },

    fillSecondsTable: function () {
        var
            model = this.model,
            second = model.get('second');

        this.ui.second.each(function (i, el) {
            var $el = $(el);
            var second = $el.attr('data-second');
            markSelected($el, parseInt(second, 10));
            markAvailable($el, parseInt(second, 10))
        });

        function markSelected($el, value) {
            $el.toggleClass('second-selected', value === second);
        }

        function markAvailable($el, value) {
            var date = moment(model.get('date')).seconds(value);
            $el.toggleClass('second-unavailable', !model.checkRange(date));
        }
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:date', this.fillSecondsTable);
    },

    useSecond: function (event) {
        var
            $el = $(event.target),
            model = this.model,
            date = model.get('date'),
            second = parseInt($el.attr('data-second'), 10);

        date.setSeconds(second);
        this.trigger('second', date);
    }

});
