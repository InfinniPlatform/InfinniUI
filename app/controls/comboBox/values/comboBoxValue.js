var ComboBoxValueModel = Backbone.Model.extend( {
} );

InfinniUI.ComboBoxValueModel = ComboBoxValueModel;

var ComboBoxValue = Backbone.View.extend( {

    template: InfinniUI.Template[ 'controls/comboBox/values/template/value.tpl.html' ],

    tagName: 'li',

    className: 'pl-combobox-value',

    events: {
        'click .pl-combobox-value-remove': 'onClickRemoveHandler'
    },

    UI: {
        item: '.pl-combobox-value-item'
    },

    initialize: function( options ) {
        this.model = new ComboBoxValueModel( options );
    },

    render: function() {
        this.$el.html( this.template() );

        this.bindUIElements();
        var $value = this.model.get( '$value' );
        this.ui.item.append( $value );
        return this.$el;
    },

    onClickRemoveHandler: function() {
        var value = this.model.get( 'value' );
        this.trigger( 'remove', value );
    }

} );

_.extend( ComboBoxValue.prototype, bindUIElementsMixin );

InfinniUI.ComboBoxValue = ComboBoxValue;
