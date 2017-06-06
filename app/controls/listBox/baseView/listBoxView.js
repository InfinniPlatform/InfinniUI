/**
 * @constructor
 * @augments ListEditorBaseView
 */
var BaseListBoxView = ListEditorBaseView.extend( {

    template: {
        plain: InfinniUI.Template[ 'controls/listBox/baseView/template/listBox.tpl.html' ],
        grouped: InfinniUI.Template[ 'controls/listBox/baseView/template/listBoxGrouped.tpl.html' ]
    },

    className: 'pl-listbox',

    events: {
        'change .pl-listbox-input': 'onChangeHandler'
    },

    UI: _.defaults( {
        items: '.pl-listbox-i',
        checkingInputs: '.pl-listbox-input input'
    }, ListEditorBaseView.prototype.UI ),

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        //@TODO Реализовать обработку значений по умолчанию!
        ListEditorBaseView.prototype.initialize.call( this, options );
    },

    /**
     *
     */
    updateGrouping: function() {
        var groupValueSelector = this.model.get( 'groupValueSelector' );
        var isGrouped = groupValueSelector !== null && typeof groupValueSelector !== 'undefined';

        if( isGrouped ) {
            this.strategy = new ListBoxViewGroupStrategy( this );
        } else {
            this.strategy = new ListBoxViewPlainStrategy( this );
        }
    },

    /**
     *
     */
    updateValue: function() {
        this.ui.items.removeClass( 'pl-listbox-i-chosen' );
        this.ui.checkingInputs.prop( 'checked', false );

        var value = this.model.get( 'value' );
        var choosingItem, $choosingItem;

        if( !this.isMultiselect() && typeof value !== 'undefined' && value !== null ) {
            value = [ value ];
        }

        if( Array.isArray( value ) ) {
            for( var i = 0, ii = value.length; i < ii; i++ ) {
                choosingItem = this.model.itemByValue( value[ i ] );
                $choosingItem = this._getElementByItem( choosingItem );

                if( $choosingItem ) {
                    $choosingItem.addClass( 'pl-listbox-i-chosen' );
                    $choosingItem.find( '.pl-listbox-input input' ).prop( 'checked', true );
                }
            }
        }
    },

    /**
     *
     * @param ignoreWasRendered
     */
    updateSelectedItem: function( ignoreWasRendered ) {
        if( !this.wasRendered && ignoreWasRendered != true ) {
            return;
        }

        this.ui.items.removeClass( 'pl-listbox-i-selected' );

        var selectedItem = this.model.get( 'selectedItem' );
        var $selectedItem = this._getElementByItem( selectedItem );

        if( $selectedItem && !$selectedItem.hasClass( 'pl-disabled-list-item' ) ) {
            $selectedItem.addClass( 'pl-listbox-i-selected' );
        }
    },

    /**
     *
     * @returns {BaseListBoxView}
     */
    render: function() {
        this.prerenderingActions();

        var preparedItems = this.strategy.prepareItemsForRendering();
        var template = this.strategy.getTemplate();

        this.removeChildElements();

        this.$el.html( template( preparedItems ) );
        this.bindUIElements();

        this.strategy.appendItemsContent( preparedItems );

        this.updateProperties();

        this.trigger( 'render' );

        this.postrenderingActions();
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    /**
     * @returns {*}
     */
    getItems: function() {
        return this.model.get( 'items' );
    },

    /**
     * @returns {*}
     */
    getItemTemplate: function() {
        return this.model.get( 'itemTemplate' );
    },

    /**
     * @returns {*}
     */
    getGroupValueSelector: function() {
        return this.model.get( 'groupValueSelector' );
    },

    /**
     * @returns {*}
     */
    isMultiselect: function() {
        return this.model.get( 'multiSelect' );
    },

    /**
     * @returns {*}
     */
    isFocusable: function() {
        return this.model.get( 'focusable' );
    },

    /**
     * @returns {*}
     */
    getGroupItemTemplate: function() {
        return this.model.get( 'groupItemTemplate' );
    },

    /**
     *
     */
    onChangeHandler: function() {
        var $checked = this.ui.checkingInputs.filter( ':checked' ).parent().parent();
        var valueForModel = null;
        var model = this.model;
        var val;

        if( this.isMultiselect() ) {
            valueForModel = [];

            $checked.each( function( i, el ) {
                val = $( el ).data( 'pl-data-item' );
                valueForModel.push( model.valueByItem( val ) );
            } );

        } else {
            if( $checked.length > 0 ) {
                valueForModel = model.valueByItem( $checked.data( 'pl-data-item' ) );
            }
        }

        this.model.set( 'value', valueForModel );
    },

    /**
     *
     */
    updateDisabledItem: function() {
        var model = this.model;
        var enabled = model.get( 'enabled' );
        var disabledItemCondition = model.get( 'disabledItemCondition' );

        this.ui.items.removeClass( 'pl-disabled-list-item' );
        this.ui.checkingInputs.attr( 'disabled', null );

        if( !enabled ) {
            disabledItemCondition = function() {
                return true;
            };
        }

        if( disabledItemCondition !== null && typeof disabledItemCondition !== 'undefined' ) {
            var that = this;

            this.ui.items.each( function( i, el ) {
                var $el = $( el );
                var item = $el.data( 'pl-data-item' );
                var isDisabled = disabledItemCondition( undefined, { value: item } );

                if( isDisabled || !enabled ) {
                    if( $el.hasClass( 'pl-listbox-i-selected' ) ) {
                        that.model.set( 'selectedItem', null );
                    }
                    $el.toggleClass( 'pl-disabled-list-item', true );
                    $el.find( 'input' ).attr( 'disabled', 'disabled' );
                    $el.find( 'button' ).attr( 'disabled', 'disabled' );
                }
            } );
        }
    },

    /**
     *
     * @param item
     * @returns {jQuery|HTMLElement}
     * @private
     */
    _getElementByItem: function( item ) {
        var element = _.find( this.ui.items, function( listboxItem ) {
            return $( listboxItem ).data( 'pl-data-item' ) == item;
        } );

        return $( element );
    }

} );

InfinniUI.ObjectUtils.setPropertyValueDirect( InfinniUI, 'viewModes.ListBox.base', BaseListBoxView );
