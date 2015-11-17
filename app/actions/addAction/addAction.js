function AddAction(parentView){
    _.superClass(AddAction, this, parentView);
}

_.inherit(AddAction, BaseEditAction);


_.extend(AddAction.prototype, {
    setSelectedItem: function(){
    },

    save: function(){
        var destinationSourceName = this.getProperty('DestinationSource');
        var destinationSource = this.parentView.getContext().dataSources[destinationSourceName];

        if(destinationSource){
            destinationSource.updateItems();
        }
    }
});