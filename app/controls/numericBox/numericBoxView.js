/**
 * @constructor
 * @augments TextEditorBaseView
 */
var NumericBoxView = TextEditorBaseView.extend( {

    className: 'pl-numericbox form-group',

    template: InfinniUI.Template[ 'controls/numericBox/template/numericBox.tpl.html' ],

    UI: _.extend( {}, TextEditorBaseView.prototype.UI, {
        min: '.pl-numeric-box-min',
        max: '.pl-numeric-box-max'
    } ),

    events: _.extend( {}, TextEditorBaseView.prototype.events, {
        'click .pl-numeric-box-min': 'onClickMinControlHandler',
        'click .pl-numeric-box-max': 'onClickMaxControlHandler',
        'mousedown .pl-numeric-box-min': 'onMousedownMinControlHandler',
        'mousedown .pl-numeric-box-max': 'onMousedownMaxControlHandler'
    } ),

    editMaskStrategies: {
        NumberEditMask: 'default'
    },

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
    getData: function() {
        var model = this.model;

        return _.extend( {},
            TextEditorBaseView.prototype.getData.call( this ), {
                minValue: model.get( 'minValue' ),
                maxValue: model.get( 'maxValue' ),
                increment: model.get( 'increment' )
            } );
    },

    onChangeEnabledHandler: function( model, value ) {
        this.ui.control.prop( 'disabled', !value );
        this.ui.min.prop( 'disabled', !value );
        this.ui.max.prop( 'disabled', !value );
    },

    /**
     *
     */
    onClickMinControlHandler: function() {
        if( this.canChangeValue() ) {
            this.model.decValue();
        }
    },

    /**
     *
     */
    onClickMaxControlHandler: function() {
        if( this.canChangeValue() ) {
            this.model.incValue();
        }
    },

    /**
     *
     * @param event
     */
    onMousedownMinControlHandler: function( event ) {
        if( this.canChangeValue() ) {
            this.repeatUpdateValue( this.model.decValue.bind( this.model ) );
        }
    },

    /**
     *
     * @param event
     */
    onMousedownMaxControlHandler: function( event ) {
        if( this.canChangeValue() ) {
            this.repeatUpdateValue( this.model.incValue.bind( this.model ) );
        }
    },

    /**
     *
     * @param cb
     */
    repeatUpdateValue: function( cb ) {
        var intervalId;

        window.document.addEventListener( 'mouseup', stopRepeat );
        intervalId = setInterval( cb, 200 );

        function stopRepeat() {
            if( intervalId ) {
                clearInterval( intervalId );
                intervalId = null;
            }
            window.document.removeEventListener( 'mouseup', stopRepeat );
        }

    },

    /**
     *
     * @returns {boolean}
     */
    canChangeValue: function() {
        var model = this.model;
        var enabled = model.get( 'enabled' );

        return enabled === true;
    }

} );

InfinniUI.NumericBoxView = NumericBoxView;
