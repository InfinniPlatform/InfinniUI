var DatePickerMinutesModel = DatePickerComponentModel.extend({

    initialize: function () {
        DatePickerComponentModel.prototype.initialize.call(this);
        this.on('change:minute', this.updateDatePart.bind(this, 'minute'));
    }

});

var DatePickerMinutes = DatePickerComponent.extend({

    modelClass: DatePickerMinutesModel,

    template: InfinniUI.Template["new/controls/datePicker/template/time/minutes.tpl.html"],

    events: {
        "click .minute": "useMinute"
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
        var minute = this.model.get('minute');

        this.ui.minute.each(function (i, el) {
            var $el = $(el);
            var minute = $el.attr('data-minute');
            markSelected($el, parseInt(minute, 10));
        });

        function markSelected($el, value) {
            $el.toggleClass('minute-selected', value === minute);
        }
    },

    initOnChangeHandlers: function () {
        this.listenTo(this.model, 'change:minute', this.onChangeMinuteHandler);
    },

    onChangeMinuteHandler: function () {
        this.fillMinutesTable();
    },

    useMinute: function (event) {
        var
            $el = $(event.target),
            model = this.model,
            date = model.get('date'),
            minute = parseInt($el.attr('data-minute'), 10);

        date.setMinutes(minute);
        this.trigger('minute', date);
    }

});
