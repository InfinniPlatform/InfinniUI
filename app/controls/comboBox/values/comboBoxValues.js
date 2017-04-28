/**
 *
 * @constructor
 */
var ComboBoxValuesModel = Backbone.Model.extend( {

    defaults: {
        enabled: true
    },

    initialize: function() {
        this.items = [];
    }

} );

InfinniUI.ComboBoxValuesModel = ComboBoxValuesModel;

/**
 *
 * @constructor
 */
var ComboBoxValues = Backbone.View.extend( {

    tagName: 'ul',

    className: 'pl-combobox-values',

    template: InfinniUI.Template[ 'controls/comboBox/values/template/values.tpl.html' ],

    events: {
        'keypress .pl-combobox-search-text': 'onKeyPressHandler',
        'keydown .pl-combobox-search-text': 'onKeyDownHandler',
        'keyup .pl-combobox-search-text': 'onKeyUpHandler',
        'click': 'onClickHandler'
    },

    UI: {
        search: '.pl-combobox-search',
        text: '.pl-combobox-search-text'
    },

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        this.model = new ComboBoxValuesModel( options );
    },

    /**
     *
     * @returns {jQuery}
     */
    render: function() {
        this.$el.empty();
        this.$el.html( this.template() );
        this.bindUIElements();

        var model = this.model;
        var $items = model.get( 'items' )
            .map( function( item ) {
                var view = new ComboBoxValue( {
                    '$value': item.$value,
                    'value': item.value
                } );

                this.listenTo( view, 'remove', this.onRemoveValueHandler );
                return view.render();
            }, this );

        this.ui.search.before( $items );

        return this.$el;
    },

    KeyCode: {
        enter: 13,
        backspace: 8,
        left: 37,
        right: 39,
        home: 36,
        end: 35,
        tab: 9
    },

    /**
     *
     */
    setFocus: function() {
        this.ui.text.focus();
    },

    /**
     *
     * @param event
     */
    onKeyPressHandler: function( event ) {
        var key = event.which;

        if( key === this.KeyCode.enter ) {

        }

        console.log( 'onKeyPressHandler', event.which, this.ui.text.val() );
    },

    /**
     *
     * @param event
     */
    onKeyDownHandler: function( event ) {
        //handle left/right/tab/Shift-tab/backspace/end/home
        var key = event.which;
        if( key === this.KeyCode.left ) {

        } else {

        }
        console.log( 'onKeyDownHandler', event.which, this.ui.text.val() );
    },

    /**
     *
     */
    onKeyUpHandler: function() {
        //@TODO grow input
        var text = this.ui.text.val();
        this.trigger( 'search', text );
    },

    /**
     *
     * @param value
     */
    onRemoveValueHandler: function( value ) {
        this.trigger( 'remove', value );
    },

    /**
     *
     */
    onClickHandler: function() {
        this.setFocus();
    }

} );

_.extend( ComboBoxValues.prototype, bindUIElementsMixin );

InfinniUI.ComboBoxValues = ComboBoxValues;
