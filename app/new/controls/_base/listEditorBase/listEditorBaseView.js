var ListEditorBaseView = ContainerView.extend( _.extend( {}, editorBaseViewMixin, {

    initHandlersForProperties: function(){
        ContainerView.prototype.initHandlersForProperties.call(this);
        editorBaseViewMixin.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:selectedItem', this.updateSelectedItem);
    },

    updateProperties: function(){
        ContainerView.prototype.updateProperties.call(this);
        editorBaseViewMixin.updateProperties.call(this);

        this.updateSelectedItem();
    }

}));