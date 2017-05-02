function ListBox( parent, viewMode ) {
    _.superClass( ListBox, this, parent, viewMode );
}

InfinniUI.ListBox = ListBox;

_.inherit( ListBox, ListEditorBase );

ListBox.prototype.createControl = function( viewMode ) {
    return new ListBoxControl( viewMode );
};
