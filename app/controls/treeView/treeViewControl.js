function TreeViewControl() {
    _.superClass(TreeViewControl, this);
}

_.inherit(TreeViewControl, ListEditorBaseControl);

_.extend(TreeViewControl.prototype, {

    createControlModel: function () {
        return new TreeViewModel();
    },

    createControlView: function (model) {
        return new TreeViewView({model: model});
    },

    expand: function( key ) {
        this.controlView.expandNode(key);
    },

    collapse: function( key ) {
        this.controlView.collapseNode(key);
    },

    toggle: function( key ) {
        this.controlView.toggleNode(key);
    }


});

