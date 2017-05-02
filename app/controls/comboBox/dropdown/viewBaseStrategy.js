/**
 * @abstract
 * @param dropdownView
 * @constructor
 */
function ComboBoxBaseViewStrategy( dropdownView ) {
    this.dropdownView = dropdownView;
}

/**
 *
 * @param {string} attributeName
 * @returns {*}
 */
ComboBoxBaseViewStrategy.prototype.getModelAttribute = function( attributeName ) {
    var model = this.dropdownView.model;

    return model.get( attributeName );
};

/**
 *
 * @param item
 * @returns {boolean}
 */
ComboBoxBaseViewStrategy.prototype.isEnabledItem = function( item ) {
    return !this.dropdownView.model.isDisabledItem( item );
};

/**
 * @description Рендеринг элементов списка
 * @abstract
 * @returns {Array.<jQuery>} Элементы списка
 */
ComboBoxBaseViewStrategy.prototype.renderItems = function() {
    throw new Error( 'Method renderItems not implemented' );
};

/**
 * @abstract
 */
ComboBoxBaseViewStrategy.prototype.getTemplate = function() {
};

/**
 * Рендеринг заданных элементов списка
 * @param {Array.<Object>} items
 * @returns {Array.<jQuery>}
 * @private
 */
ComboBoxBaseViewStrategy.prototype._renderItems = function( items ) {
    var $items;
    var collection = this.getModelAttribute( 'items' );
    var itemTemplate = this.getModelAttribute( 'itemTemplate' );

    $items = items.map( function( item ) {
        var itemEl = itemTemplate( undefined, {
            value: item,
            index: collection.indexOf( item )
        } );
        var $item = itemEl.render();

        if ( typeof item !== 'undefined' ) {
            $item.data( 'pl-data-item', item );
        }

        this.addOnClickEventListener( $item, item );
        this.addOnHoverEventListener( $item, item );

        itemEl.setEnabled( this.isEnabledItem( item ) );

        return $item;
    }, this );

    return $items;
};

/**
 *
 * @param {jQuery} $el
 */
ComboBoxBaseViewStrategy.prototype.addOnClickEventListener = function( $el ) {
    var el = $el[ 0 ];
    var params = Array.prototype.slice.call( arguments, 1 );
    var handler = this.trigger.bind( this, 'click' );

    el.addEventListener( 'click', function() {
        handler.apply( this, params );
    } );
};

/**
 *
 * @param $el
 */
ComboBoxBaseViewStrategy.prototype.addOnHoverEventListener = function( $el ) {
    var params = Array.prototype.slice.call( arguments, 1 );
    var handler = this.trigger.bind( this, 'mouseenter' );

    $el.on( 'mouseenter', function() {
        handler.apply( this, params );
    } );
};

_.extend( ComboBoxBaseViewStrategy.prototype, Backbone.Events );

InfinniUI.ComboBoxBaseViewStrategy = ComboBoxBaseViewStrategy;
