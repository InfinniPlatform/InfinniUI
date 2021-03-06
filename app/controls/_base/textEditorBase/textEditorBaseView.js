/**
 * @class TextEditorBaseView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @mixes editMaskViewMixin
 */
var TextEditorBaseView = ControlView.extend( /** @lends TextEditorBaseView.prototype */ _.extend( {}, editorBaseViewMixin, editMaskViewMixin, {
    UI: _.extend( {}, editorBaseViewMixin.UI, {
        control: '.pl-control',
        editor: '.pl-editor',
        label: '.pl-control-label',
        textbox: '.pl-text-box-input'
    } ),

    events: _.extend(
        {},
        ControlView.prototype.events,
        editMaskViewMixin.events
    ),

    /**
     *
     */
    initialize: function() {
        ControlView.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        editMaskViewMixin.initialize.call( this );
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call( this );
        editorBaseViewMixin.initHandlersForProperties.call( this );
        editMaskViewMixin.initHandlersForProperties.call( this );

        this.listenTo( this.model, 'change:labelText', this.updateLabelText );
        this.listenTo( this.model, 'change:labelTextTitle', this.updateLabelTextTitle );
        this.listenTo( this.model, 'change:displayFormat', this.updateDisplayFormat );
        this.listenTo( this.model, 'change:editMask', this.updateEditMask );
        this.listenTo( this.model, 'change:inputType', this.updateInputType );
    },

    /**
     *
     */
    updateProperties: function() {
        ControlView.prototype.updateProperties.call( this );
        editorBaseViewMixin.updateProperties.call( this );

        this.updateLabelText();
        this.updateLabelTextTitle();
        this.updateInputType();
    },

    /**
     *
     */
    updateFocusable: function() {
        var focusable = this.model.get( 'focusable' );

        if( !focusable ) {
            this.ui.editor.attr( 'tabindex', -1 );
        } else {
            this.ui.editor.removeAttr( 'tabindex' );
        }
    },

    /**
     *
     */
    updateInputType: function() {
        var inputType = this.model.get( 'inputType' );
        this.ui.editor.attr( 'type', inputType );

    },

    /**
     *
     */
    updateEditMask: function() {
        // this.updateValue();
    },

    /**
     *
     */
    setFocus: function() {
        this.ui.editor.focus();
    },

    /**
     *
     */
    updateValue: function() {
        editorBaseViewMixin.updateValueState.call( this );
        this.ui.control.val( this.getDisplayValue() );
    },

    /**
     *
     */
    updateLabelText: function() {
        var labelText = this.model.get( 'labelText' );

        if( labelText !== '' && labelText !== null && typeof labelText !== 'undefined' ) {
            this.ui.label
                .text( labelText )
                .removeClass( 'hidden' );
        } else {
            this.ui.label
                .text( '' )
                .addClass( 'hidden' );
        }
    },

    /**
     *
     */
    updateLabelTextTitle: function() {
        var labelTextTitle = this.model.get( 'labelTextTitle' );
        var labelText = this.model.get( 'labelText' );

        if( labelTextTitle && labelText && labelText !== '' ) {
            this.ui.label.attr( 'title', labelText );
        } else {
            this.ui.label.attr( 'title', null );
        }
    },

    /**
     *
     */
    updateDisplayFormat: function() {
        this.updateValue();
    },

    /**
     *
     * @returns {*}
     */
    getData: function() {
        var model = this.model;

        return _.extend( {},
            ControlView.prototype.getData.call( this ),
            editorBaseViewMixin.getData.call( this ), {
                labelText: model.get( 'labelText' ),
                labelFloating: model.get( 'labelFloating' ),
                value: this.getDisplayValue()
            } );
    },

    /**
     *
     * @returns {*}
     */
    getDisplayValue: function() {
        var model = this.model;
        var value = model.get( 'value' );
        var displayFormat = model.get( 'displayFormat' );

        return displayFormat ? displayFormat( null, { value: value } ) : value;
    },

    /**
     *
     * @returns {*}
     */
    getRawValue: function() {
        return this.ui.editor.val();
    }

} ) );

InfinniUI.TextEditorBaseView = TextEditorBaseView;
