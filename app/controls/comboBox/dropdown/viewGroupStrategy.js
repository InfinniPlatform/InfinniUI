/**
 *
 * @param {ComboBoxDropdownView} dropdownView
 * @augments ComboBoxBaseViewStrategy
 * @constructor
 */
function ComboBoxGroupViewStrategy( dropdownView ) {
    ComboBoxBaseViewStrategy.call( this, dropdownView );
}

ComboBoxGroupViewStrategy.prototype = Object.create( ComboBoxBaseViewStrategy.prototype );
ComboBoxGroupViewStrategy.prototype.constructor = ComboBoxGroupViewStrategy;

ComboBoxGroupViewStrategy.prototype.template = InfinniUI.Template[ 'controls/comboBox/dropdown/template/group/template.tpl.html' ];

ComboBoxGroupViewStrategy.prototype.renderItems = function() {
    var collection = this.getModelAttribute( 'items' );
    var groupingFunction = this.getModelAttribute( 'groupValueSelector' );
    var groups = {};
    var $items;

    collection.forEach( function( item, index ) {
        var groupKey = groupingFunction( undefined, { value: item, index: index } );

        if( !( groupKey in groups ) ) {
            groups[ groupKey ] = [];
        }

        groups[ groupKey ].push( item );
    } );

    $items = this.renderGroups( groups );

    return $items;
};

/**
 * @description Рендереинг группированных элементов
 * @param {Array.<Object>} groups
 * @returns {Array.<jQuery>} Элементы групп
 */
ComboBoxGroupViewStrategy.prototype.renderGroups = function( groups ) {
    var groupItemTemplate = this.getModelAttribute( 'groupItemTemplate' );
    var collection = this.getModelAttribute( 'items' );
    var $items = [];
    var $groupItems;
    var $groups = [];

    for( var name in groups ) {
        var items = groups[ name ];
        //Шаблонизированный заголовок группы
        var $header = groupItemTemplate( undefined, {
            index: collection.indexOf( items[ 0 ] ),
            item: items[ 0 ]
        } );
        //Шаблонизированные элементы группы
        $groupItems = this._renderItems( items );

        var groupView = new ComboBoxGroupView( {
            header: $header.render(),
            items: $groupItems
        } );

        Array.prototype.push.apply( $items, $groupItems );
        $groups.push( groupView.render() );
    }

    this.dropdownView.setItemsContent( $groups );

    return $items;
};


ComboBoxGroupViewStrategy.prototype.getTemplate = function() {
    return this.template;
};

InfinniUI.ComboBoxGroupViewStrategy = ComboBoxGroupViewStrategy;

