/**
 * @class
 * @augments TextEditorBaseView
 * @constructor
 */
var DateTimePickerView = TextEditorBaseView.extend( {

    className: 'pl-datepicker form-group',

    template: InfinniUI.Template[ 'controls/dateTimePicker/template/date.tpl.html' ],

    UI: _.extend( {}, TextEditorBaseView.prototype.UI, {
        dropdownButton: '.pl-datepicker-calendar',
        controlWrap: '.control-wrap',
        editorWrap: '.editor-wrap'
    } ),

    events: _.extend( {}, TextEditorBaseView.prototype.events, {
        'click .pl-datepicker-calendar': 'onClickDropdownHandler',
        'keydown .pl-control': 'onKeyDownControlHandler'
    } ),

    editMaskStrategies: {
        DateTimeEditMask: 'iso8601'
    },

    /**
     *
     */
    initialize: function() {
        TextEditorBaseView.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        this.updateMode();
        this.listenTo( this.model, 'change:mode', this.updateMode );
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        TextEditorBaseView.prototype.initHandlersForProperties.call( this );

        this.listenTo( this.model, 'change:minValue', this.updateMinValue );
        this.listenTo( this.model, 'change:maxValue', this.updateMaxValue );
    },

    /**
     *
     */
    updateProperties: function() {
        TextEditorBaseView.prototype.updateProperties.call( this );
    },

    /**
     *
     */
    updateMode: function() {
        var mode = this.model.get( 'mode' );
        _.extend( this, dateTimePickerStrategy[ mode ] );

        this.rerender();
    },

    /**
     *
     */
    updateMinValue: function() {
        var mode = this.model.get( 'mode' );
        _.extend( this, dateTimePickerStrategy[ mode ] );

        this.rerender();
    },

    /**
     *
     */
    updateMaxValue: function() {
        var mode = this.model.get( 'mode' );
        _.extend( this, dateTimePickerStrategy[ mode ] );

        this.rerender();
    },

    /**
     *
     */
    updateEnabled: function() {
        TextEditorBaseView.prototype.updateEnabled.call( this );

        var isEnabled = this.model.get( 'enabled' );
        this.ui.dropdownButton.prop( 'disabled', !isEnabled );
    },

    /**
     *
     * @returns {DateTimePickerView}
     */
    render: function() {
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
     * @returns {*}
     */
    getData: function() {
        var model = this.model;

        return _.extend( {},
            TextEditorBaseView.prototype.getData.call( this ), {
                minValue: model.get( 'minValue' ),
                maxValue: model.get( 'maxValue' ),
                mode: model.get( 'mode' )
            } );
    },

    /**
     *
     */
    getTemplate: function() {
        throw new Error( 'Не перекрыт getTemplate' );
    },

    /**
     *
     */
    onClickDropdownHandler: function() {
        this.toggleDropdown();
    },

    /**
     *
     * @returns {boolean}
     */
    toggleDropdown: function() {
        var dropdown = this.model.get( 'dropdown' );

        if( dropdown !== null ) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    },

    /**
     *
     */
    openDropdown: function() {
    },

    /**
     *
     */
    closeDropdown: function() {
        var dropdown = this.model.get( 'dropdown' );
        dropdown.onClickBackdropHandler();
    },

    /**
     *
     * @param event
     * @returns {*}
     */
    onKeyDownControlHandler: function( event ) {
        var enabled = this.model.get( 'enabled' );
        var expandOnEnter = this.model.get( 'expandOnEnter' );

        if( !enabled ) {
            event.preventDefault();
            return;
        }

        if( event.ctrlKey || event.altKey ) {
            return;
        }
        switch( event.which ) {
            case 13:    //Enter
                if( expandOnEnter ) {
                    event.preventDefault();
                    this.toggleDropdown();
                }
                break;
            default:
                break;
        }
    }

} );

InfinniUI.DateTimePickerView = DateTimePickerView;
