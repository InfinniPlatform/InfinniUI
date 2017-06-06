/**
 *
 * @param parent
 * @param viewMode
 * @constructor
 * @augments ListEditorBase
 */
function ListBox( parent, viewMode ) {
    _.superClass( ListBox, this, parent, viewMode );
}

InfinniUI.ListBox = ListBox;

_.inherit( ListBox, ListEditorBase );

/**
 *
 * @param viewMode
 * @returns {ListBoxControl}
 */
ListBox.prototype.createControl = function( viewMode ) {
    return new ListBoxControl( viewMode );
};
