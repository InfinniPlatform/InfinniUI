/**
 *
 * @constructor
 */
var ComboBoxDropdownView = Backbone.View.extend( {

    className: 'pl-dropdown-container',

    events: {
        'click .backdrop': 'onClickBackdropHandler',
        'keyup .pl-combobox-filter-text': 'onKeyUpHandler',
        'keydown .pl-combobox-filter-text': 'onFilterKeyDownHandler'
    },

    UI: {
        items: '.pl-combobox-items',
        filter: '.pl-combobox-filter',
        text: '.pl-combobox-filter-text',
        noItems: '.pl-combobox-items-empty'
    },

    /**
     *
     */
    initialize: function() {
        var groupValueSelector = this.model.get( 'groupValueSelector' );
        var isGrouped = groupValueSelector !== null && typeof groupValueSelector !== 'undefined';

        if( isGrouped ) {
            this.strategy = new ComboBoxGroupViewStrategy( this );
        } else {
            this.strategy = new ComboBoxPlainViewStrategy( this );
        }

        this.listenTo( this.model, 'change:noItemsMessage', this.updateNoItemsMessage );
        this.listenTo( this.model, 'change:dropdown', this.onChangeDropdownHandler );
        this.listenTo( this.model, 'change:autocompleteValue', this.onChangeSearchHandler );
        this.listenTo( this.model, 'change:autocomplete', this.updateAutocomplete );
        this.listenTo( this.model, 'change:selectedItem', this.onChangeSelectedItem );
        this.listenTo( this.strategy, 'click', this.onClickItemHandler );
        this.listenTo( this.strategy, 'mouseenter', this.onMouseEnterItemHandler );
        this.model.onValueChanged( this.onChangeValueHandler.bind( this ) );

        var items = this.model.get( 'items' );

        var view = this;
        items.onChange( function() {
            view.renderItems();
        } );
    },

    /**
     *
     */
    updateProperties: function() {
        this.updateAutocomplete();
        this.updateNoItemsMessage();
    },

    /**
     *
     */
    updateNoItemsMessage: function() {
        var model = this.model;
        var noItemsMessage = model.get( 'noItemsMessage' ) || localized.strings.ComboBox.noItemsMessage;
        this.ui.noItems.html( noItemsMessage );
    },

    /**
     *
     * @returns {jQuery}
     */
    render: function() {
        var template = this.strategy.getTemplate();
        this.$el.html( template( {
            multiSelect: this.model.get( 'multiSelect' )
        } ) );
        this.bindUIElements();
        this.updateProperties();
        this.renderItems();
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this.$el;
    },

    /**
     *
     */
    renderItems: function() {
        this.$el.hide();
        this.$items = this.strategy.renderItems();
        var items = this.model.get( 'items' );
        var isInitialized = this.model.get( 'isInitialized' );

        var noItems = ( isInitialized && items && items.length == 0 );
        this.ui.noItems.toggleClass( 'hidden', !noItems );

        this.markSelectedItems();
        this.markCheckedItems();

        this.trigger( 'itemsRendered2' );
        this.$el.show();
    },

    /**
     *
     * @param content
     */
    setItemsContent: function( content ) {
        var $items = this.ui.items;
        $items.empty();
        $items.append( content );
    },

    /**
     *
     */
    close: function() {
        this.model.set( 'dropdown', false );
    },

    /**
     *
     */
    setSearchFocus: function() {
        this.ui.text.focus();
    },

    /**
     *
     */
    onClickBackdropHandler: function() {
        this.close();
    },

    /**
     *
     */
    onChangeValueHandler: function() {
        this.markCheckedItems();
    },

    /**
     *
     */
    markSelectedItems: function() {
        var model = this.model;
        if( !Array.isArray( this.$items ) ) {
            return;
        }

        var $items = this.$items;
        var selectedItem = model.getSelectedItem();

        $items.forEach( function( $item ) {
            var selected = selectedItem === $item.data( 'pl-data-item' );
            $item.toggleClass( 'pl-combobox-selected', selected );
        } );

        this.ensureVisibleSelectedItem();
    },

    /**
     *
     */
    ensureVisibleSelectedItem: function() {
        if( !Array.isArray( this.$items ) ) {
            return;
        }

        var $container = this.ui.items;
        var $items = this.$items;
        var selectedItem = this.model.getSelectedItem();

        $items.some( function( $item ) {
            var selected = selectedItem === $item.data( 'pl-data-item' );
            if( selected ) {
                ensureItem( $container, $item );
            }
            return selected;
        } );

        function ensureItem( $container, $item ) {
            var newScrollTop;
            var scrollTop = $container.scrollTop();
            var itemTop = $item.position().top;
            var itemHeight = $item.outerHeight();
            var viewHeight = $container.innerHeight();

            if( itemTop + itemHeight > viewHeight ) {
                newScrollTop = scrollTop + itemTop + itemHeight - viewHeight;
            } else if( itemTop < 0 ) {
                newScrollTop = scrollTop + itemTop;
            }

            if( typeof newScrollTop !== 'undefined' ) {
                $container.scrollTop( newScrollTop );
            }
        }
    },

    /**
     *
     */
    markCheckedItems: function() {
        var model = this.model;
        var value = model.getValue();

        if( !Array.isArray( this.$items ) ) {
            return;
        }

        var $items = this.$items;
        var isMultiSelect = !!model.get( 'multiSelect' );
        var items = [];

        if( isMultiSelect && Array.isArray( value ) ) {
            items = value.map( function( val ) {
                return model.itemByValue( val );
            } );
        } else {
            items = [ model.itemByValue( value ) ];
        }

        $items.forEach( function( $item ) {
            var selected = items.indexOf( $item.data( 'pl-data-item' ) ) !== -1;
            $item.toggleClass( 'pl-combobox-checked', selected );
        } );
    },

    /**
     *
     * @param model
     * @param dropdown
     */
    onChangeDropdownHandler: function( model, dropdown ) {
        if( !dropdown ) {
            this.remove();
        }
    },

    /**
     *
     */
    updateAutocomplete: function() {
        var autocomplete = this.model.get( 'autocomplete' );
        this.ui.filter.toggleClass( 'hidden', !autocomplete );
    },

    /**
     *
     * @param item
     */
    onMouseEnterItemHandler: function( item ) {
        this.model.setSelectedItem( item );
    },

    /**
     *
     * @param item
     */
    onClickItemHandler: function( item ) {
        var isEnabled = !this.model.isDisabledItem( item );

        if( isEnabled ) {
            this.model.toggleItem( item );
            this.close();
        }
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
     * @param event
     */
    onKeyDownHandler: function( event ) {
        var model = this.model;
        event.preventDefault();
        this.onFilterKeyDownHandler( event );
    },

    /**
     *
     * @param event
     */
    onFilterKeyDownHandler: function( event ) {
        var model = this.model;

        switch( event.which ) {
            case 36://Home;
                model.selectFirstItem();
                break;
            case 35: //End
                model.selectLastItem();
                break;
            case 38: //Up
                model.selectPrevItem();
                break;
            case 40: //Down
                model.selectNextItem();
                break;
            case 13:
                this.onClickItemHandler( model.getSelectedItem() );
                break;
            case 9:
                this.close();
                break;
            case 27://Escape
                this.close();
                event.stopPropagation();
                break;
            default:
                break;
        }
    },

    /**
     *
     * @param model
     * @param value
     */
    onChangeSearchHandler: function( model, value ) {
        var search = this.ui.noItems.find( '.search-message' );

        if( search.length ) {
            search.text( value );
        }

        this.model.set( 'isInitialized', false );
        this.renderItems();
    },

    /**
     *
     */
    onChangeSelectedItem: function() {
        this.markSelectedItems();
    },

    /**
     *
     * @param baseWidthDOMElement
     * @param basePositionDOMElement
     */
    updatePosition: function( baseWidthDOMElement, basePositionDOMElement ) {
        var direction = this.getDropdownDirection( baseWidthDOMElement );
        this.setPositionFor( baseWidthDOMElement, basePositionDOMElement, direction );
    },

    /**
     *
     * @param baseWidthDOMElement
     * @param basePositionDOMElement
     * @param direction
     */
    setPositionFor: function( baseWidthDOMElement, basePositionDOMElement, direction ) {
        clearInterval( this._intervalId );

        this.applyStyle( baseWidthDOMElement, basePositionDOMElement, direction );
        this._intervalId = setInterval( this.applyStyle.bind( this, baseWidthDOMElement, basePositionDOMElement, direction ), 100 );
    },

    /**
     *
     * @returns {*}
     */
    remove: function() {
        clearInterval( this._intervalId );
        return Backbone.View.prototype.remove.apply( this, arguments );
    },

    /**
     *
     * @param parentDOMElement
     * @returns {string}
     */
    getDropdownDirection: function( parentDOMElement ) {
        var windowHeight = $( window ).height();
        var rect = parentDOMElement.getBoundingClientRect();
        var height = this.$el.height();
        var direction = 'bottom';

        if( rect.bottom + height + 30 > windowHeight && rect.bottom > windowHeight / 2 ) {
            direction = 'top';
        }

        return direction;
    },

    /**
     *
     * @param baseWidthDOMElement
     * @param basePositionDOMElement
     * @param direction
     */
    applyStyle: function( baseWidthDOMElement, basePositionDOMElement, direction ) {
        var widthElementRect = baseWidthDOMElement.getBoundingClientRect();
        var positionElementRect = basePositionDOMElement.getBoundingClientRect();
        var style = {
            left: window.pageXOffset + positionElementRect.left,
            width: Math.round( widthElementRect.width )
        };

        if( direction === 'bottom' ) {
            style.top = window.pageYOffset + positionElementRect.bottom;
        } else {
            style.top = window.pageYOffset + positionElementRect.top - this.$el.height();
        }

        this.$el.css( style );
    }

} );

_.extend( ComboBoxDropdownView.prototype, bindUIElementsMixin );

InfinniUI.ComboBoxDropdownView = ComboBoxDropdownView;
