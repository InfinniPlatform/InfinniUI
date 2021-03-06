/**
 *
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @constructor
 */
var CheckBoxView = ControlView.extend( _.extend( {}, editorBaseViewMixin, {

    template: InfinniUI.Template[ 'controls/checkBox/template/checkBox.tpl.html' ],

    UI: _.extend( {}, editorBaseViewMixin.UI, {
        text: '.checkbox-label',
        input: 'input'
    } ),

    events: {
        'click input': 'onClickHandler'
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call( this );
        editorBaseViewMixin.initHandlersForProperties.call( this );
    },

    /**
     *
     */
    updateProperties: function() {
        ControlView.prototype.updateProperties.call( this );
        editorBaseViewMixin.updateProperties.call( this );
    },

    /**
     *
     */
    updateFocusable: function() {
        var focusable = this.model.get( 'focusable' );

        if ( !focusable ) {
            this.ui.input.attr( 'tabindex', -1 );
        } else {
            this.ui.input.removeAttr( 'tabindex' );
        }
    },

    /**
     *
     */
    updateText: function() {
        var text = this.model.get( 'text' );

        this.ui.text.text( text ? text : '' );
    },

    /**
     *
     */
    updateEnabled: function() {
        ControlView.prototype.updateEnabled.call( this );
        var enabled = this.model.get( 'enabled' );
        this.ui.input.prop( 'disabled', !enabled );
    },

    /**
     *
     * @returns {CheckBoxView}
     */
    render: function() {
        this.prerenderingActions();
        this.renderTemplate( this.template );
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
    onClickHandler: function() {
        var model = this.model;

        var enabled = model.get( 'enabled' );
        if ( enabled ) {
            model.set( 'value', !model.get( 'value' ) );
        }
    },

    /**
     *
     */
    updateValue: function() {
        var value = this.model.get( 'value' );
        this.ui.input.prop( 'checked', !!value );
    },

    /**
     *
     */
    setFocus: function() {
        this.ui.input.focus();
    }

} ) );

InfinniUI.CheckBoxView = CheckBoxView;
