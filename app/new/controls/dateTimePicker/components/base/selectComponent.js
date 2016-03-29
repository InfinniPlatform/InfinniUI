var SelectComponent = Backbone.View.extend({

    modelClass: Backbone.Model,

    initialize: function (options) {
        var modelClass = this.modelClass;

        this.model = new modelClass({
            today: new Date(),
            value: options.value,
            date: options.date,
            max: options.max,
            min: options.min
        });
        this.render();
        return this;
    },

    show: function () {
        this.$el.css('display', 'block');
    },

    hide: function () {
        this.$el.css('display', 'none');
    },

    /**
     * @description Установка текущего положения списка выбора значений
     * Если устанавливается недействительная дата - используется текущая
     * @param date
     */
    setDate: function (date) {
        if (typeof date == 'undefined' || date === null){
            var value = this.model.get('value'),
                today = this.model.get('today');

            date = value || today;
        } else {
            date = new Date(date);
        }
        this.model.set('date', date);
    }

});


_.extend(SelectComponent.prototype, bindUIElementsMixin);