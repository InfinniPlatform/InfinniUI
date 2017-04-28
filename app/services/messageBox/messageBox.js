/**
 * @constructor
 * @mixes bindUIElementsMixin
 */
var MessageBox = Backbone.View.extend( {

    tagName: 'div',

    className: 'modal fade messagebox',

    UI: {
        firstfocuselementinmodal: '.firstfocuselementinmodal',
        lastfocuselementinmodal: '.lastfocuselementinmodal'
    },

    events: {
        'click .btn': 'onClickButtonHandler',
        'focusin .lastfocuselementinmodal': 'onFocusinLastElement',
        'keydown': 'onKeydownHandler'
    },

    template: InfinniUI.Template[ 'services/messageBox/template/default.tpl.html' ],

    initialize: function( options ) {
        this.setOptions( options );

        // чтобы пользователь случайно не обратился к элементу в фокусе,
        // пока диалоговое окно создается и ещё не перехватило фокус,
        // необходимо старую фокусировку снять
        $( document.activeElement ).blur();
        this.render();
        this.bindUIElements();
        this.$el
            .modal( { show: true } );
    },

    setOptions: function( config ) {
        this.options = this.applyDefaultOptions( config );
    },

    onFocusinLastElement: function() {
        this.ui.firstfocuselementinmodal.focus();
    },

    onKeydownHandler: function( event ) {
        if( document.activeElement === this.ui.lastfocuselementinmodal[ 0 ] && ( event.which || event.keyCode ) == 9 ) {
            event.preventDefault();
            this.ui.firstfocuselementinmodal.focus();
        }

        if( document.activeElement === this.ui.firstfocuselementinmodal[ 0 ] && ( event.which || event.keyCode ) == 9 && event.shiftKey ) {
            event.preventDefault();
            this.ui.lastfocuselementinmodal.focus();
        }
    },

    render: function() {
        var $parent = this.options.$parent || $( 'body' );
        var html = this.template( this.options );

        this.$el.html( html );

        this.subscribeToDialog();
        $parent.append( this.$el );

        return this;
    },

    subscribeToDialog: function() {
        var view = this;

        this.$el.on( 'shown.bs.modal', function( e ) {
            view.ui.firstfocuselementinmodal.focus();
        } );

        this.$el.on( 'hidden.bs.modal', function() {
            view.remove();
        } );
    },

    onClickButtonHandler: function( event ) {
        event.preventDefault();

        var $el = $( event.target );
        var i = parseInt( $el.data( 'index' ), 10 );
        var handler = this.options.buttons[ i ].onClick;

        if( handler ) {
            handler.apply( null );
        }

        this.close();
    },

    close: function() {
        if( typeof this.options.onClose === 'function' ) {
            this.options.onClose.call( null );
        }

        this.$el.modal( 'hide' );
    },

    applyDefaultOptions: function( config ) {
        var options = _.defaults( {}, config, {
            buttons: []
        } );
        this.applyDefaultButtonsOptions( options );

        return options;
    },

    applyDefaultButtonsOptions: function( options ) {
        options.buttons
            .filter( function( button ) {
                return typeof button.type === 'undefined';
            } )
            .forEach( function( button ) {
                button.type = 'default';
            } );

        return options;
    }
} );

_.extend( MessageBox.prototype, bindUIElementsMixin );

InfinniUI.MessageBox = MessageBox;
