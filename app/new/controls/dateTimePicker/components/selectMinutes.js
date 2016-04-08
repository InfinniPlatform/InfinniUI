var SelectMinutesModel = SelectComponentModel.extend({

    initialize: function () {
        SelectComponentModel.prototype.initialize.call(this);
        this.on('change:minute', this.updateDatePart.bind(this, 'minute'));
    }

});

var SelectMinutes = SelectComponent.extend({

    modelClass: SelectMinutesModel,

    template: InfinniUI.Template["new/controls/dateTimePicker/template/time/minutes.tpl.html"],

    events: {
        "click .minute:not('.minute-unavailable')": "useMinute"
    },

    UI: {
        minute: '.minute'
    },

    render: function () {
        var template = this.template();
        this.$el.html(template);
        this.bindUIElements();
        this.fillMinutesTable();
        this.initOnChangeHandlers();
    },

    fillMinutesTable: function () {
        var
            model = this.model,
            minute = model.get('minute');

        this.ui.minute.each(function (i, el) {
            var $el = $(el);
            var minute = $el.attr('data-minute');
            markSelected($el, parseInt(minute, 10));
            markAvailable($el, parseInt(minute, 10))
        });

        function markSelected($el, value) {
            $el.toggleClass('minute-selected', value === minute);
        }

        function markAvailable($el, value) {
            var date = moment(model.get('date')).minute(value);
            $el.toggleClass('minute-unavailable', !model.checkRange(date, 'minute'));
        }
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:date', this.fillMinutesTable);
    },

    useMinute: function (event) {
        var
            $el = $(event.target),
            model = this.model,
            date = model.get('date'),
            minute = parseInt($el.attr('data-minute'), 10);

        var newDate = InfinniUI.DateUtils.cloneDate(date);
        newDate.setMinutes(minute);
        this.trigger('minute', newDate);
    }

});
