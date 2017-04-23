var ListEditorBaseView = ContainerView.extend( _.extend( {}, editorBaseViewMixin, {

    initHandlersForProperties: function() {
        ContainerView.prototype.initHandlersForProperties.call( this );
        editorBaseViewMixin.initHandlersForProperties.call( this );

        this.listenTo( this.model, 'change:selectedItem', this.updateSelectedItem );
        this.listenTo( this.model, 'change:multiSelect', this.updateMultiSelect );
        this.listenTo( this.model, 'change:disabledItemCondition', this.updateDisabledItem );
    },

    updateProperties: function() {
        ContainerView.prototype.updateProperties.call( this );
        editorBaseViewMixin.updateProperties.call( this );

        this.updateSelectedItem();
        this.updateMultiSelect();
        this.updateDisabledItem();
    },

    updateMultiSelect: function() {
    }

} ) );

InfinniUI.ListEditorBaseView = ListEditorBaseView;
