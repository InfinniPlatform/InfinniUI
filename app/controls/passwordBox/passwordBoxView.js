/**
 * @constructor
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var PasswordBoxView = ControlView.extend( _.extend( {}, editorBaseViewMixin, {

    className: 'pl-password-box form-group',

    template: {
        'autocomplete': InfinniUI.Template[ 'controls/passwordBox/template/passwordBox.on.tpl.html' ],
        'noautocomplete': InfinniUI.Template[ 'controls/passwordBox/template/passwordBox.off.tpl.html' ]
    },

    UI: _.extend( {}, editorBaseViewMixin.UI, {
        label: '.pl-control-label',
        input: '.pl-control'
    } ),

    events: {
        'blur .pl-control': 'onBlurHandler',
        'input .pl-control': 'onInputHandler',
        'change .pl-control': 'onChangeHandler'
    },

    /**
     *
     */
    initialize: function() {
        ControlView.prototype.initialize.apply( this );
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        ControlView.prototype.initHandlersForProperties.call( this );
        editorBaseViewMixin.initHandlersForProperties.call( this );

        this.listenTo( this.model, 'change:labelText', this.updateLabelText );
        this.listenTo( this.model, 'change:labelTextTitle', this.updateLabelTextTitle );
        this.listenTo( this.model, 'change:labelFloating', this.updateLabelFloating );
        this.listenTo( this.model, 'change:autocomplete', this.updateAutocomplete );
    },

    /**
     *
     */
    updateProperties: function() {
        ControlView.prototype.updateProperties.call( this );
        editorBaseViewMixin.updateProperties.call( this );

        this.updateLabelText();
        this.updateLabelTextTitle();
    },

    /**
     *
     */
    updateLabelText: function() {
        var labelText = this.model.get( 'labelText' );

        if( labelText !== '' && labelText !== null && typeof labelText !== 'undefined' ) {
            this.ui.label.text( labelText );
        } else {
            this.ui.label.css( { display: 'none' } );
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
    updateAutocomplete: function() {
        this.rerender();
    },

    /**
     *
     */
    updateValue: function() {
        editorBaseViewMixin.updateValueState.call( this );

        var value = this.model.get( 'value' );
        this.ui.input.val( value );
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
     * @returns {*}
     */
    getData: function() {
        return _.extend(
            {},
            ControlView.prototype.getData.call( this ),
            editorBaseViewMixin.getData.call( this )
        );
    },

    /**
     *
     * @returns {PasswordBoxView}
     */
    render: function() {
        var model = this.model;

        this.prerenderingActions();
        this.renderTemplate( this.getTemplate() );

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
    remove: function() {
        ControlView.prototype.remove.call( this );
    },

    /**
     *
     * @returns {*}
     */
    getTemplate: function() {
        var model = this.model;

        return model.get( 'autocomplete' ) ? this.template.autocomplete : this.template.noautocomplete;
    },

    /**
     *
     */
    updateModelValue: function() {
        var value = this.ui.input.val();
        var model = this.model;

        model.set( 'value', value );
        model.set( 'rawValue', value );
    },

    /**
     *
     */
    onBlurHandler: function() {
        this.updateModelValue();
    },

    /**
     *
     */
    onChangeHandler: function() {
        this.updateModelValue();
    },

    /**
     *
     */
    onInputHandler: function() {
        this.updateModelValue();
    }

} ) );

InfinniUI.PasswordBoxView = PasswordBoxView;
