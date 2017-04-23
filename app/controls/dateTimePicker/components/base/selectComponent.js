var SelectComponent = Backbone.View.extend( {

    modelClass: Backbone.Model,

    initialize: function( options ) {
        var modelClass = this.modelClass;

        this.model = new modelClass( {
            today: options.today || new Date(),
            value: options.value,
            date: options.value || options.today,
            max: options.max,
            min: options.min
        } );
        this.render();
        return this;
    },

    show: function() {
        this.$el.css( 'display', 'block' );
    },

    hide: function() {
        this.$el.css( 'display', 'none' );
    },

    /**
     * @description Установка текущего положения списка выбора значений
     * Если устанавливается недействительная дата - используется текущая
     * @param date
     */
    setDate: function( date ) {
        this.model.setDate( date );
    }

} );

_.extend( SelectComponent.prototype, bindUIElementsMixin );

InfinniUI.SelectComponent = SelectComponent;
