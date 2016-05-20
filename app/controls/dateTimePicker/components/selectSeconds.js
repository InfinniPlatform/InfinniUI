var SelectSecondsModel = SelectComponentModel.extend({

    initialize: function () {
        SelectComponentModel.prototype.initialize.call(this);
        this.on('change:second', this.updateDatePart.bind(this, 'second'));
    }

});

var SelectSeconds = SelectComponent.extend({

    modelClass: SelectSecondsModel,

    template: InfinniUI.Template["controls/dateTimePicker/template/time/seconds.tpl.html"],

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

        var newDate = InfinniUI.DateUtils.cloneDate(date);

        newDate.setSeconds(second);
        this.trigger('second', newDate);
    }

});
