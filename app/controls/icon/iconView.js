/**
 * @constructor
 * @arguments ControlView
 */
var IconView = ControlView.extend( {

    className: 'pl-icon fa',

    tagName: 'i',

    /**
     *
     * @returns {IconView}
     */
    render: function() {
        this.prerenderingActions();
        this.updateProperties();
        this.trigger( 'render' );
        this.postrenderingActions();
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    /**
     *
     */
    renderIcon: function() {
        var value = this.model.get( 'value' );
        this.switchClass( 'fa', value );
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:value', this.updateValue );
        this.listenTo( this.model, 'change:size', this.updateSize );
    },

    /**
     *
     */
    updateSize: function() {
        var newSize = this.model.get( 'size' );
        this.changeElementClass( this.valueToSizeClassName( this.currentSize ), this.valueToSizeClassName( newSize ) );
        this.currentSize = newSize;
    },

    /**
     *
     * @param value
     * @returns {string}
     */
    valueToSizeClassName: function( value ) {
        if( value ) return 'pl-iconSize-' + value.toLowerCase();
        else return '';
    },

    /**
     *
     */
    updateProperties: function() {
        ControlView.prototype.updateProperties.call( this );
        this.updateValue();
        this.updateSize();
    },

    /**
     *
     */
    updateFocusable: function() {
        var focusable = this.model.get( 'focusable' );

        if ( focusable ) {
            this.$el.attr( 'tabindex', 0 );
        } else {
            this.$el.removeAttr( 'tabindex' );
        }
    },

    /**
     *
     */
    updateValue: function() {
        this.renderIcon();
    },

    /**
     *
     */
    updateTextStyle: function() {
        // do nothing, because icon don't have text
    }

} );

InfinniUI.IconView = IconView;
