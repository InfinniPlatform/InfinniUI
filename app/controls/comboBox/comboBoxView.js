/**
 *
 * @constructor
 */
var ComboBoxView = ListEditorBaseView.extend( {

    className: 'pl-combobox form-group',

    template: InfinniUI.Template[ 'controls/comboBox/template/combobox.tpl.html' ],

    events: {
        'click .pl-combobox__grip': 'onClickGripHandler',
        'click .pl-combobox__value': 'onClickValueHandler',
        'click .pl-combobox__clear': 'onClickClearHandler',
        'click .pl-control': 'onClickValueHandler',
        'keydown .pl-control': 'onKeyDownControlHandler'
    },

    UI: _.defaults( {
        control: '.pl-control',
        label: '.pl-control-label',
        value: '.pl-combobox__value',
        clear: '.pl-combobox__clear'
    }, ListEditorBaseView.prototype.UI ),

    /**
     *
     * @param el
     * @returns {*}
     */
    isControlElement: function( el ) {
        var res = ListEditorBaseView.prototype.isControlElement.call( this, el );

        if( res ) {
            return res;
        }

        if( !this.dropDownView ) {
            return false;
        }

        return $.contains( this.dropDownView.el, el );
    },

    /**
     *
     */
    updateFocusable: function() {
        var focusable = this.model.get( 'focusable' );
        var enabled = this.model.get( 'enabled' );

        if( focusable && enabled ) {
            this.ui.control.attr( 'tabindex', 0 );
        } else {
            this.ui.control.removeAttr( 'tabindex' );
        }
    },

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        ListEditorBaseView.prototype.initialize.call( this, options );
        var model = this.model;
        var view = this;

        this.on( 'render', function() {
            view.renderValue();

            model.on( 'change:dropdown', function( model, dropdown ) {
                if( dropdown ) {
                    model.set( 'autocompleteValue', '' );//Сброс фильтра
                    model.set( 'focused', true );
                    if( view.dropDownView ) {
                        view.dropDownView.remove();
                    }
                    var dropdownView = new ComboBoxDropdownView( {
                        model: model
                    } );
                    view.dropDownView = dropdownView;

                    this.listenTo( dropdownView, 'search', _.debounce( view.onSearchValueHandler.bind( view ), 300 ) );

                    var $dropdown = dropdownView.render();
                    $( 'body' ).append( $dropdown );

                    var baseWidthDOMElement = view.el;
                    var basePositionDOMElement = view.ui.control.get( 0 );

                    dropdownView.updatePosition( baseWidthDOMElement, basePositionDOMElement );

                    view.dropDownView.on( 'itemsRendered2', function() {
                        dropdownView.updatePosition( baseWidthDOMElement, basePositionDOMElement );
                    } );

                    if( model.get( 'autocomplete' ) ) {
                        dropdownView.setSearchFocus();
                    } else {
                        view.ui.control.focus();
                    }
                    setTimeout( dropdownView.ensureVisibleSelectedItem.bind( dropdownView ), 0 );
                } else {
                    view.ui.control.focus();
                }
            } );
            model.onValueChanged( this.onChangeValueHandler.bind( this ) );

        }, this );
    },

    /**
     *
     */
    initHandlersForProperties: function() {
        ListEditorBaseView.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:showClear', this.updateShowClear );
        this.listenTo( this.model, 'change:labelText', this.updateLabelText );
    },

    /**
     *
     * @returns {ComboBoxView}
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
    getTemplate: function() {
        return this.template;
    },

    /**
     *
     * @param event
     * @returns {*}
     */
    onKeyDownControlHandler: function( event ) {
        var enabled = this.model.get( 'enabled' );

        if( !enabled ) {
            event.preventDefault();
            return;
        }

        if( event.ctrlKey || event.altKey ) {
            return;
        }

        if( this.isDropdown() ) {
            return this.dropDownView.onKeyDownHandler.call( this.dropDownView, event );
        }
        switch( event.which ) {
            case 40:    //Down Arrow
            case 13:    //Ennter
                event.preventDefault();
                this.toggleDropdown();
                break;
            default:
                break;
        }
    },

    /**
     *
     */
    onClickClearHandler: function() {
        var enabled = this.model.get( 'enabled' );

        if( enabled ) {
            this.model.set( 'value', null );
            this.ui.control.focus();
        }
    },

    /**
     *
     */
    onClickGripHandler: function() {
        var enabled = this.model.get( 'enabled' );

        if( enabled ) {
            this.toggleDropdown();
        }
    },

    /**
     *
     */
    updateProperties: function() {
        ListEditorBaseView.prototype.updateProperties.call( this );

        this.updateLabelText();
        this.updateShowClear();
    },

    /**
     *
     */
    updateGrouping: function() {
        this.toggleDropdown( false );
    },

    /**
     *
     */
    updateLabelText: function() {
        var labelText = this.model.get( 'labelText' );

        if( labelText && labelText !== '' ) {
            this.ui.label.toggleClass( 'hidden', false );
        } else {
            this.ui.label.toggleClass( 'hidden', true );
        }

        this.ui.label.text( labelText );
    },

    /**
     *
     */
    updateEnabled: function() {
        ListEditorBaseView.prototype.updateEnabled.call( this );

        var enabled = this.model.get( 'enabled' );

        if( !enabled ) {
            //Prevent got focus
            this.ui.control.removeAttr( 'tabindex' );
        } else {
            this.updateFocusable();
        }

    },

    /**
     *
     */
    updateValue: function() {
        this.updateShowClear();
    },

    /**
     *
     */
    updateShowClear: function() {
        var model = this.model;
        var showClear = model.get( 'showClear' );
        var value = model.get( 'value' );
        var noValue = value === null || typeof value === 'undefined';

        this.ui.clear.toggleClass( 'hidden', !showClear || noValue );
    },

    /**
     *
     */
    updateSelectedItem: function() {
    },

    /**
     *
     */
    updateDisabledItem: function() {
        this.toggleDropdown( false );
    },

    /**
     *
     * @returns {boolean}
     */
    isDropdown: function() {
        var model = this.model;
        return !!model.get( 'dropdown' );
    },

    /**
     *
     * @param toggle
     */
    toggleDropdown: function( toggle ) {
        var model = this.model;
        if( typeof toggle === 'undefined' ) {
            toggle = !model.get( 'dropdown' );
        }
        model.set( 'dropdown', toggle );
    },

    /**
     *
     */
    onChangeValueHandler: function() {
        this.renderValue();
    },

    /**
     *
     */
    rerender: function() {
    },

    /**
     *
     */
    renderValue: function() {
        var model = this.model;
        var multiSelect = model.get( 'multiSelect' );
        var value = this.model.get( 'value' );
        var $value = [];
        var valueTemplate = this.model.get( 'valueTemplate' );

        if( multiSelect && Array.isArray( value ) ) {
            var valueView = new ComboBoxValues( {
                items: value.map( function( val, i ) {
                    return {
                        '$value': valueTemplate( null, { value: val, index: i } ).render(),
                        'value': val,
                        'index': i
                    };
                } )
            } );
            valueView.listenTo( model, 'toggle', valueView.setFocus );
            this.listenTo( valueView, 'remove', this.onRemoveValueHandler );
            this.listenTo( valueView, 'search', _.debounce( this.onSearchValueHandler.bind( this ), 300 ) );
            $value = valueView.render();
        } else {
            $value = valueTemplate( null, { value: value } ).render();
        }
        this.ui.value.empty();
        this.ui.value.append( $value );

        editorBaseViewMixin.updateValueState.call( this );
    },

    /**
     *
     * @param value
     */
    onRemoveValueHandler: function( value ) {
        this.model.toggleValue( value, false );
    },

    /**
     * @description Устанока фильтра быстрого выбора элемента из списка
     * @param {string} text
     */
    onSearchValueHandler: function( text ) {
        this.toggleDropdown( true );
        this.model.set( 'autocompleteValue', text );
    },

    /**
     *
     * @param event
     */
    onClickValueHandler: function( event ) {
        var enabled = this.model.get( 'enabled' );

        if( enabled ) {
            this.toggleDropdown( true );
        }
    }

} );

InfinniUI.ComboBoxView = ComboBoxView;
